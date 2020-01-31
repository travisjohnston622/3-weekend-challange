$(document).ready(init);

function init() {
    console.log('JQ');
    $('#js-input').on('submit', onSubmitForm);
    $('#viewTasks').on('click', '.js-completed-btn', completedSwitch);
    $('#viewTasks').on('click', '.js-delete-btn', onTaskDelete);
    getTasks();
}

function onSubmitForm(event) {
    console.log('onSubmitForm')
    const newTasks = {
        task: $('.taskIn').val(),
        date: $('.dateIn').val(),
        notes: $('.notesIn').val(),
        completed: $('.completedIn').val()
    };
    $('.taskIn').val('');
    $('.dateIn').val('');
    $('.notesIn').val('');
    $('.completedIn').val('');

    postTasks(newTasks);
}

function onTaskDelete(event) {
    const taskId = $(this).data('id');

    deleteTask(taskId);
}

function completedSwitch(event) {
    const taskId = event.target.dataset.id;
    let completeStatus = event.target.dataset.status;
    console.log('completeStatus:', completeStatus);

    if (completeStatus == 'true') {
        completeStatus = 'false';
    } else {
        completeStatus = 'true';
    }
    putTasks(taskId, completeStatus);
    addClass();
}

function postTasks(newTasks) {
    $.ajax({
        method: 'POST',
        url: '/api/tasks',
        data: newTasks,
    })
        .then(function (response)  {
            console.log('POST Tasks');
            getTasks();
        })
        .catch(function (err)  {
            console.warn(err);
        })

}

function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/api/tasks',
    })
        .then(function (response)  {
            console.log('GET!');
            render(response);
        })
        .catch(function (err)  {
            console.warn(err);
        })

}

function putTasks(isComplete, id) {
    console.log('putTasks - id, isComplete:', id, isComplete);
    $.ajax({
        method: 'PUT',
        url: `/api/tasks/${id}`,
        data: {
            completed: isComplete
        }
    })
        .then(function (response) {
            console.log('PUT tasks!');
            getTask();
        })
        .catch(function (err) {
            console.warn(err);
        })

}

function deleteTask(id) {
    $.ajax({
        method: 'DELETE',
        url: `/api/tasks/${id}`,
    })
        .then(function (response) {
            getTasks();
        })
        .catch(function (err) {
            console.warn(err);
            alert('Something went wrong')
        })
}


function addClass() {
    $(this).parent().addClass('green');
};

function render(listOfTask) {
    console.log(listOfTask)
    const $taskElement = $('.js-viewTask')

    $taskElement.empty();
    for (let i = 0; i < listOfTask.length; i++) {
        const tasks = listOfTask[i];
        let completeStatus = `complete`;
        let completeBtn = 'INCOMPLETE';

        if (!tasks.complete) {
            completeStatus = 'NOT complete';
            completeBtn = 'COMPLETE'
        }

        $taskElement.append(`
    <tr>
      <td>${tasks.task}</td>
      <td>${tasks.date}</td>
      <td>${tasks.notes}</td>
      <td>${tasks.completed}</td>
      <td><button class="js-btn-delete" data-id="${tasks.id}">DELETE</button></td>
      <td><button class='js-completed-btn' data-id="${tasks.id}" data-status=${tasks.complete}>${completeBtn}</button></td>
    </tr>
  `)

    }
}

