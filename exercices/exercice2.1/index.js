function addDateTime(date) {
    alert(date);
}

const date = new Date();
addDateTime(date.toLocaleDateString() + " " + date.toLocaleTimeString());


