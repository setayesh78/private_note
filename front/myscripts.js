var link = "url has not been built";
var link_= "url has not been built";


async function sendToBaseUrl() {
    event.preventDefault(); //for preventing the web to do it's default behavior

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        redirect: 'follow'
    };

    var inpt = document.getElementById("story")
    console.log(inpt.value)

    requestOptions.body = JSON.stringify({
        "content": inpt.value
    });

    fetch("http://127.0.0.1:8000/note/add/", requestOptions)
        .then(response => response.text())
        .then(result => link = result)
        .catch(error => console.log('error', error));

    setTimeout(() => { console.log(link); }, 7000);

    setTimeout(() => { url_a = 'index1.html?name=' + link; }, 7500);

    setTimeout(() => { window.location.href = url_a; }, 8500);


}

function index1_call() {
    event.preventDefault(); //for preventing the web to do it's default behavior

    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    const name_ = data.name.replaceAll('%22', '');
    document.getElementById("name__id").value = name_;
    console.log(document.location.href)

}


function selectText() {
    var input = document.getElementById('name__id');
    input?.focus();
    input.select();
    url_a = 'index2.html?name=' + input.value;
    window.location.href = url_a;
}

function showNote() {

    console.log(document.location.href)
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    const name_ = data.name.replaceAll('%22', '');
    url_a = name_;
    console.log(url_a)

    url_b = url_a.replaceAll('get', 'delete')
    console.log(url_b)
    var test =url_b.split("/").pop().replaceAll('}','')
    console.log(test)

     fetch('http://127.0.0.1:8000/note/delete/'+test)
    .then(response => response.text())
    .then(data => link_=data)
    .catch(error => console.log('error', error));
    console.log(link_)

    setTimeout(() => { console.log(link_); }, 6000);

    setTimeout(() => { url_a = 'index3.html?name=' + link_; }, 6500);

    setTimeout(() => { window.location.href = url_a; }, 7500);
}

function index2_call() {
    event.preventDefault(); //for preventing the web to do it's default behavior

    var url = document.location.href,
        params = url.split('?name=')[1];

    document.getElementById("new_name_id").value = params.replaceAll('%22','');
}








