onload = () => {
    var mode = "bright"
    button = document.getElementById('moon')
    button.onclick = () => {
        if(mode === "bright") {
        document.querySelector('body').style.backgroundColor = '#0d1117'
        document.querySelector('body').style.color = 'white'
        mode = "dark"
        } else {
        document.querySelector('body').style.backgroundColor = '#FAFAFA'
        document.querySelector('body').style.color = 'black'           
        mode = "bright"

        
        }
    }
}