/*"SPDX-License-Identifier: <SPDX-License>"*/
pragma solidity >=0.4.21 <0.9.0;
import './Token.sol';
contract Swap{
       string public name="Swap Exchange";
       Token public token;
       uint public rate =100;
       event TokenPurchased(
              address account,
              address token,
              uint amount,
              uint rate
       );
        event TokenSold(
              address account,
              address token,
              uint amount,
              uint rate
       );
constructor(Token _token)public{
token = _token;
}
function buyToken() public payable {
       uint tokenAmount = msg.value * rate;
       require(token.balanceOf(address(this))>= tokenAmount);
token.transfer(msg.sender, tokenAmount);
 emit TokenPurchased(msg.sender, address(token), tokenAmount,rate);
}

function sellToken(uint _amount)public{
       uint etherAmount = _amount /rate;
require(address(this).balance >= etherAmount);
       token.transferFrom(msg.sender, address(this), _amount);
       msg.sender.transfer(etherAmount);
       emit TokenSold(msg.sender,address(token),_amount,rate);
}
}


























