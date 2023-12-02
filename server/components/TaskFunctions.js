function updateTask(existingTask, updatedTask) {
    Object.assign(existingTask, updatedTask);
}

module.exports = { updateTask };
