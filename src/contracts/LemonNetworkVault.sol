pragma solidity 0.6.12;

interface ERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract LemonNetworkVault {
    ERC20 public token;
    uint256 public lmnVault;

    uint256 public total_lmn;

    uint256 public depositTimeLine;
    uint256 public endTime;

    uint256 public maxLmnDeposit;

    struct UserInfo {
        uint256 amount;
        uint256 rewardDebt;
        uint256 depositTimestamp;
    }

    mapping(address => UserInfo) public userInfo;

    struct UserUnlock {
        bool unlocked;
    }

    mapping(address => UserUnlock) public unlockList;

    address payable public governance;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    constructor(address payable _governance, ERC20 _token) public {
        governance = _governance;
        token = _token;
        lmnVault = 0;
        total_lmn = 0;
        maxLmnDeposit = 7500000000000000000000000;
        depositTimeLine = 1643669999; // Mon Jan 31 2022 23:59:59 GMT+0100 (hora estándar de Europa central)
        endTime = 1675205999; // Tue Jan 31 2023 23:59:59 GMT+0100 (hora estándar de Europa central)
    }

    receive() external payable {
        governance.transfer(msg.value);
    }

    function unlock() public payable returns (bool) {
        require(unlockList[msg.sender].unlocked != true, "Already paied");
        governance.transfer(50000000000000000);
        unlockList[msg.sender].unlocked = true;
        return true;
    }

    function depositVault(uint256 _amount) public {
        require(unlockList[msg.sender].unlocked == true, "Contract Locked");
        require(now <= depositTimeLine);
        require(total_lmn + _amount <= maxLmnDeposit, "Maximum Amount Reached"); //5,500,000 LMN

        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "ERC20 Transfer Failed"
        );

        UserInfo storage user = userInfo[msg.sender];
        user.depositTimestamp = now;
        user.amount = user.amount + _amount;
        user.rewardDebt = (user.amount * 877) / 1000;
        total_lmn = total_lmn + _amount;

        emit Deposit(msg.sender, _amount);
    }

    function withdrawVault() public {
        require(now > endTime, "Tried withdrawal before end time");
        require(unlockList[msg.sender].unlocked == true, "Contract Locked");

        UserInfo storage user = userInfo[msg.sender];

        uint256 withAmount = user.amount + user.rewardDebt;
        require(
            token.transfer(msg.sender, withAmount),
            "Could not Withdraw LMN"
        );
        user.amount = 0;
        user.rewardDebt = 0;
        emit Withdraw(msg.sender, withAmount);
    }

    function withdrawEthers(uint256 _weiAmount) public returns (bool success) {
        require(msg.sender == governance, "Only authorized method !");

        governance.transfer(_weiAmount);

        return true;
    }

    function withdrawUnsoldTokens(uint256 _tokens)
        public
        returns (bool success)
    {
        require(msg.sender == governance, "!governance");

        require(token.transfer(governance, _tokens), "Transfer not successful");

        return true;
    }
}
