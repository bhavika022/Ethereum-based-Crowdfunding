pragma solidity >=0.4.21 <0.7.0;

contract Crowdfunding {
    uint256 public taskCount = 0;

    struct Task {
        uint256 id;
        uint256 targetAmount;
        uint256 currentAmount;
        string content;
        bool completed;
    }

    mapping(uint256 => Task) public tasks;

    constructor() public {
        createTask("First Task", 0);
    }

    event taskCreated(
        uint256 id,
        uint256 targetAmount,
        string content,
        bool comleted
    );

    event amountInvested(uint256 id, uint256 amountInvested);

    event taskCompleted(uint256 id, bool completed);

    function createTask(string memory _content, uint256 _targetAmount) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _targetAmount, 0, _content, false);
        emit taskCreated(taskCount, _targetAmount, _content, false);
    }

    function investAmount(uint256 _id, uint256 _amountInvested) public {
        Task memory _task = tasks[_id];
        _task.currentAmount = _task.currentAmount + _amountInvested;
        emit amountInvested(_id, _amountInvested);
    }

    function completeTask(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit taskCompleted(_id, true);
    }
}
