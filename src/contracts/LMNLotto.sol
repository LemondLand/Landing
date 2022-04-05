pragma solidity ^0.6.12;



contract LMNLotto {

    string public tokenName = "LMN Lotto";
    string public tokenSymbol = "LMNX";

    address public winner;
    uint256 public maxTickets;
    uint256 public remaingTickets;
    uint256 public ticketCount = 0;
    uint256 public randomNum;
    uint256 public endTime = 1652565600; //	Sun May 15 2022 00:00:00 GMT+0200 (Central Europe Time)
    
    address public latestWinner;
    uint256 public lmnLottoPot;
    address public governance;

    address[] public tickets;
    address payable public lemonFeeComi;
    mapping(address => uint256) public winnings;
    mapping(address => uint) public purchasedTickets;
    
    constructor(
        uint256 _maximumTickets,
        address payable _lemonFeeComi,
        address payable _governance
    ) public {
       
        maxTickets = _maximumTickets;
        remaingTickets = _maximumTickets;
        lemonFeeComi = _lemonFeeComi;
        governance = _governance;
    }

    function buy1() public payable {
        require(block.timestamp <= endTime, "LMN Lotto is Closed");
        require(msg.value == 1000000000000000000); //! 1 EWT
        uint256 val = msg.value / 1000000000000000000;

        require(ticketCount + val <= maxTickets, "No more LMN Lotto Tickets");
        remaingTickets -= val;
        lmnLottoPot += msg.value;

        purchasedTickets[msg.sender] =   purchasedTickets[msg.sender] +val;

        tickets.push(msg.sender);
        ticketCount++;
    }
    
    function buy5() public payable {
        require(block.timestamp <= endTime, "LMN Lotto is Closed");
        require(msg.value == 5000000000000000000); //! 5 EWT
        uint256 val = msg.value / 1000000000000000000;

        require(ticketCount + val <= maxTickets, "No more LMN Lotto Tickets");
        remaingTickets -= val;
        lmnLottoPot += msg.value;

        purchasedTickets[msg.sender] =   purchasedTickets[msg.sender] +val;
        

       for(uint256 i = 0 ; i < 5; i++){
        tickets.push(msg.sender);
        ticketCount++;
        }

    }
    
    function buy10() public payable {
        require(block.timestamp <= endTime, "LMN Lotto is Closed");
        require(msg.value == 10000000000000000000); //! 10 EWT
        uint256 val = msg.value / 1000000000000000000;

        require(ticketCount + val <= maxTickets, "No more LMN Lotto Tickets");
        remaingTickets -= val;
        lmnLottoPot += msg.value;



        purchasedTickets[msg.sender] =   purchasedTickets[msg.sender] +val;

        for(uint256 i = 0 ; i < 10; i++){
        tickets.push(msg.sender);
        ticketCount++;
        }
    }
    
    function buy20() public payable {
        require(block.timestamp <= endTime, "LMN Lotto is Closed");
        require(msg.value == 20000000000000000000); //! 20 EWT
        uint256 val = msg.value / 1000000000000000000;

        require(ticketCount + val <= maxTickets, "No more LMN Lotto Tickets");
        remaingTickets -= val;
        lmnLottoPot += msg.value;


      purchasedTickets[msg.sender] =   purchasedTickets[msg.sender] +val;

        for(uint256 i = 0 ; i < 20; i++){
        tickets.push(msg.sender);
        ticketCount++;
        }
    }

    function withdrawUser() public {
        require(block.timestamp > endTime, "LMN Lotto is not finished");
        require(winnings[msg.sender] > 0);

        uint256 amountToWithdraw = winnings[msg.sender];

        amountToWithdraw *= 1000000000000000000;
        uint256 lemonFee = (amountToWithdraw * 2) / 10;
        amountToWithdraw = amountToWithdraw - lemonFee;

        lemonFeeComi.transfer(lemonFee);
        msg.sender.transfer(amountToWithdraw);
        winnings[msg.sender] = 0;
    }

    function withdrawOwner(address payable winnerAddress) public  {

        require(msg.sender == governance, "Not Allowed");
        require(winnings[winnerAddress] > 0);

        uint256 amountToWithdraw = winnings[winnerAddress];

        amountToWithdraw *= 1000000000000000000;
        uint256 lemonFee = (amountToWithdraw * 2) / 10;
        amountToWithdraw = amountToWithdraw - lemonFee;

        lemonFeeComi.transfer(lemonFee);
        winnerAddress.transfer(amountToWithdraw);
        winnings[winnerAddress] = 0;
    }


    function chooseWinner() public  {
        require(msg.sender == governance, "Not Allowed");
        require(ticketCount > 0);

        randomNum = uint256(blockhash(block.number - 1)) % ticketCount;

        latestWinner = tickets[randomNum];

        winner = latestWinner;

        winnings[latestWinner] = ticketCount;
        ticketCount = 0;
        remaingTickets = maxTickets;

        delete tickets;
    }

    function ticketsLength() external view returns (uint256) {
        return tickets.length;
    }

    function withdrawEthers(uint256 _amount) public {
        require(msg.sender == governance, "Not Allowed");
        lemonFeeComi.transfer(_amount);
    }


}
