// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract ToDoList {
    uint256 private _idCounter;
    address public owner;

    struct ToDo {
        address creator;
        uint256 id;
        string message;
        bool completed;
    }

    mapping(address => ToDo[]) public userToDos;
    event ToDoCreated(address indexed creator, uint256 id, string message, bool completed);

    constructor() {
        owner = msg.sender;
    }

    function createToDo(string calldata _message) external {
        _idCounter++;
        ToDo memory newToDo = ToDo({
            creator: msg.sender,
            id: _idCounter,
            message: _message,
            completed: false
        });

        userToDos[msg.sender].push(newToDo);
        emit ToDoCreated(msg.sender, _idCounter, _message, false);
    }

    function getToDos(address _user) external view returns (ToDo[] memory) {
        return userToDos[_user];
    }

    function toggleCompletion(address _user, uint256 _id) external {
        ToDo[] storage toDos = userToDos[_user];
        for (uint256 i = 0; i < toDos.length; i++) {
            if (toDos[i].id == _id) {
                toDos[i].completed = !toDos[i].completed;
                break;
            }
        }
    }
}
