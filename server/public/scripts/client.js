$(document).ready(init);

function init() {
    console.log('JQ');
    $('#addButton').on('submit', onSubmitForm);
    $('#viewTasks').on('click', '.js-completed-btn', completedSwitch);
    getTasks();
}

function onSubmitForm(event) {
    event.preventDefault();

    const newTasks = {
        task: $('#taskIn').val(),
        date: $('#dateIn').val(),
        notes: $('#notesIn').val(),
        completed: $('#completedIn').val(),
    };

    postTasks(newTasks);
}

function postTasks(newTasks) {
    $.ajax({
        method: 'POST',
        url: '/api/tasks',
        data: newTasks,
    })
        .then((response) => {
            console.log('POST Tasks');
            getTasks();
        })
        .catch((err) => {
            console.warn(err);
        })

}

function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/api/tasks',
    })
        .then((response) => {
            console.log('GET!');
            render(response);
        })
        .catch((err) => {
            console.warn(err);
        })
        
}

function putTasks(completed, id) {
    console.log(completed);
    $.ajax({
        method: 'PUT',
        url: '/api/tasks/' + id,
        data: {
            completed: completed
        }
    })
        .then((response) => {
            console.log('PUT tasks!');
            getTask();
        })
        .catch((err) => {
            console.warn(err);
        })

}

function completedSwitch() {
    let id = $(this).data('id');
    let val = true;
    const comp = $(this).data('comp');
    console.log(comp);

    if (comp == 'yes') {
        val = 'no';
    } else {
        val = 'yes';
    }
    addClass();
    putTasks(val, id);
}

function addClass () {
    $(this).parent().addClass('green');
};

function render(response) {
    $('#viewTasks').empty();

    for (let i = 0; i < response.length; i++) {
        const tasks = response[i];

        $('#viewTasks').append(`
    <tr>
      <td>${tasks.task}</td>
      <td>${tasks.date}</td>
      <td>${tasks.notes}</td>
      <td>${tasks.completed}</td>
      <td><button class='js-completed-btn' data-comp="${tasks.completed}" data-id=${tasks.id}>Task Completed</button></td>
    </tr>
  `)

    }
}
        
        