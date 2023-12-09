document.addEventListener("DOMContentLoaded", (event) => {
    var acc = document.querySelectorAll("#accordion");
    console.log(acc)
    acc.forEach((item)=>{
        item.addEventListener('click', ()=>{
            alert('clicked')
            item.classList.toggle('active')
            var panel = item.nextElementSibling;
            if (panel.style.display === "block") {
              panel.style.display = "none";
            } else {
              panel.style.display = "block";
            }
        })
    })
  });

const myClick = (item)=>{
    
    item.classList.toggle('active')
    var panel = item.nextElementSibling;
    console.log(panel)
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
}

const myClick2 = ()=>{
    alert('clicked')
}