var showingSourceCode= false;
var isInEditMode = true;
var isNavOpen = false;

function enableEditing(){
    texteditor.document.designMode ="On";
}

function execCmd(command){
    texteditor.document.execCommand(command,false,null);
}

function execCommandWithArg(command,arg){
    if(arg)
    texteditor.document.execCommand(command,false,arg);
}

function toggleSource(){
    if(showingSourceCode){
        texteditor.document.getElementsByTagName('body')[0].innerHTML = texteditor.document.getElementsByTagName('body')[0].textContent;
        showingSourceCode = false;
    }else{
        texteditor.document.getElementsByTagName('body')[0].textContent = texteditor.document.getElementsByTagName('body')[0].innerHTML;
        showingSourceCode= true;
    }
}

function toggleEdit(){
    if(isInEditMode){
        texteditor.document.designMode ="Off";
        isInEditMode =false;
    }else{
        texteditor.document.designMode ="On";
        isInEditMode = true;
    }
}

function submitNote(idname){
    if(texteditor.document.getElementsByTagName('body')[0].innerHTML.length <=0){
    alert("There is no content.");
    return;
    }
    var description = document.getElementById('ei1');
    if(description.value.length<=0){
        description.value = texteditor.document.getElementsByTagName('body')[0].textContent.substring(0,75);
    }
    document.getElementById(idname).value = texteditor.document.getElementsByTagName('body')[0].innerHTML;
}

function openNav(){
    document.getElementById('sideBar').style.width = ((0.75 *window.innerWidth)+"px");
    document.getElementById('sideBar').style.display = "inline";
    document.getElementById('openBtn').innerText = "Less";
    document.getElementsByClassName('e1')[0].style.height = "100%";
    document.getElementById('sideBar').style.zIndex =100;
}

function closeNav(){
    document.getElementById('sideBar').style.width = 0;
    document.getElementById('sideBar').style.display = "none";
    document.getElementById('openBtn').innerText = "More";
    document.getElementsByClassName('e1')[0].style.height = "100%";
    document.getElementById('sideBar').style.zIndex ="";
}

function toggleNav(){
    if(isNavOpen){
        closeNav();
    }else{
        openNav();
    }
    isNavOpen =!isNavOpen;
}

function moreOption(media){
    if(media.matches){
        document.getElementById('sideBar').style.display = "none";
    }else{
        closeNav();
        document.getElementById('sideBar').style.display = "inline";
    }
}
function setHeight(media){
    if(media.matches){
        document.getElementsByClassName('e1')[0].style.height = "100%";
    }else{
        document.getElementsByClassName('e1')[0].style.height = "100%";
    }
}
var media = window.matchMedia("(max-width: 891px)");
var media1= window.matchMedia("(max-width: 380px)");


moreOption(media);
media.addListener(moreOption);

setHeight(media1);
media1.addListener(setHeight);

