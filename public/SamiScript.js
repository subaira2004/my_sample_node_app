var MyData = [];
var btnSave;
window.onload = function () {
    btnSave = document.getElementById('btnSave');
    btnClear = document.getElementById('btnClear');
    btnSave.addEventListener('click', manipulateData);
    btnClear.addEventListener('click', clearForm);
};

function manipulateData() {
    if (validateData()) {
        if (IsEditMode() == false) {
            saveData();
        }
        else {
            var result = updateData();
            if (result == false) {
                alert('wrongly updated!');
            }
        }
        clearForm();
        refereshResultTable();
    }
}

function IsEditMode() {
    if (document.getElementById("hId").value == "") {
        return false;
    }
    return true;
}

function clearForm() {
    document.getElementById("hId").value = "";
    document.getElementById("txtName").value = "";
    document.getElementById("txtAge").value = "";
    document.getElementById("selGender").value = "0";
    document.getElementById("taRemarks").value = "";
    document.getElementById("btnClear").value = "Clear";
    document.getElementById("btnSave").value = "Save";
}

function showMessage(message, flag = false) {
    alert(message);
    return flag;
}

function validateData() {
    var name = document.getElementById("txtName").value;
    var age = document.getElementById("txtAge").value;
    var gender = document.getElementById("selGender").value;
    if (name == '') {
        return showMessage('hey fill the name');
    }
    if (age == '' || age == '0') {
        return showMessage('hey fill the age');
    }
    if (isNaN(age)) {
        return showMessage('hey fill the age properly');
    }
    if (gender == '0') {
        return showMessage('hey fill the gender');
    }
    return true;
}

function saveData() {

    var saveData = getEmptyDataObject();
    saveData.id = getNewId();
    saveData.name = document.getElementById("txtName").value;
    saveData.age = document.getElementById("txtAge").value;
    saveData.gender = document.getElementById("selGender").value;
    saveData.remarks = document.getElementById("taRemarks").value;
    MyData.push(saveData);
}

function updateData() {
    var editId = document.getElementById("hId").value;
    for (var i = 0; i < MyData.length; i++) {
        if (MyData[i].id == editId) {
            MyData[i].name = document.getElementById("txtName").value;
            MyData[i].age = document.getElementById("txtAge").value;
            MyData[i].gender = document.getElementById("selGender").value;
            MyData[i].remarks = document.getElementById("taRemarks").value;
            return true;
        }
    }
    return false;
}


function getEmptyDataObject() {
    var emptyData = {
        id: null,
        name: '',
        age: 0,
        gender: '',
        remarks: ''
    };
    return emptyData;
}

function getNewId() {
    var d = new Date();
    var retId = d.getFullYear() + '' + (d.getMonth() + 1) + '' + d.getDate() + '' + d.getTime();
    return retId;
}

function appendTdInTr(data,tr) {
    var tdName = document.createElement('td');
    tdName.innerHTML = data;
    tr.appendChild(tdName);
}

function refereshResultTable() {
    var divResult = document.getElementById('divResult');
    if (MyData.length > 0) {
        var tblResult = document.getElementById('tblResult');
        var tblResultBody = tblResult.children[0];
        var noOfRows = tblResultBody.children.length;
        for (var i = noOfRows - 1; i >= 0; i--) {
            if (tblResultBody.children[i].id != "trResultHead") {
                tblResultBody.children[i].remove();
            }
        }
        var noOfData = MyData.length;
        for (i = 0; i < noOfData; i++) {
            //
            var trTmp = document.createElement('tr');
            //
            appendTdInTr( MyData[i].name,trTmp);           
            //
            appendTdInTr( MyData[i].age,trTmp);    
            //
            appendTdInTr( MyData[i].gender,trTmp);   
            //
            appendTdInTr( MyData[i].remarks,trTmp);   
            //
            appendTdInTr('<a href="#" onclick="editEmp(' + MyData[i].id + ')">Edit</a>&nbsp;<a href="#" onclick="deleteEmp(' + MyData[i].id + ')">Delete</a>',trTmp);  
            //
            tblResultBody.appendChild(trTmp);
        }
        divResult.style.display = 'block';
    }
    else {
        divResult.style.display = 'none';
    }
}

function getEmpDataById(id) {
    for (var i = 0; i < MyData.length; i++) {
        if (MyData[i].id == id) {
            return MyData[i];
        }
    }
    return null;
}

function editEmp(id) {
    var editedData = getEmpDataById(id);
    if (editedData) {
        document.getElementById("hId").value = editedData.id;
        document.getElementById("txtName").value = editedData.name;
        document.getElementById("txtAge").value = editedData.age;
        document.getElementById("selGender").value = editedData.gender;
        document.getElementById("taRemarks").value = editedData.remarks;
        document.getElementById("btnClear").value = "Cancel";
        document.getElementById("btnSave").value = "Update";
    }
    else {
        alert('invalid edit request!');
    }
}

function deleteEmp(id) {
    if (confirm('Are you sure want tp delete this?')) {
        for (var i = 0; i < MyData.length; i++) {
            if (MyData[i].id == id) {
                MyData.pop(MyData[i]);
                clearForm();
                refereshResultTable();
                return true;
            }
        }
    }
}