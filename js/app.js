
function loadSVG(){
    fetch("img/Grad-SVG.svg")
    .then((response) => {return response.text();})
    .then((svg) =>{
        document.getElementById("story-parallax").innerHTML = svg;
        document.querySelector('#story-parallax svg').setAttribute("PreserveAspectRatio","xMidYMid slice");
        setAnimationScroll();
    })
}

loadSVG()



function setAnimationScroll(){
    gsap.registerPlugin(ScrollTrigger);

    let runAnimation = gsap.timeline({
        scrollTrigger:{
            trigger: "#story-parallax",
            start: "top",
            end: "bottom",
            markers:true,
            scrub: true,
            pin:true,
        }
    });
    
    runAnimation.add([   
        gsap.to('#Scene_1_fg_0', 0, {
            y: -2500
        }),           
        
        gsap.to('#Scene_1_layer_0', 0, {
            y: -2200
        }),            
        
        gsap.to('#Scene_1_fog_0', 0, {
            y: -2200
        }),           
        gsap.to('#Scene_1_layer_1', 0, {
            y: -2200
        }),          
        gsap.to('#Scene_1_fog_1', 0, {
            y: -2200
        }),         
        
        gsap.to('#Scene_1_Layer_2', 0, {
            y: -2200
        }),              
        gsap.to('#Scene_1_Tower', 0, {
            y: -2200
        }),           
        gsap.to('#Scene_1_bg', 0, {
            y: -2200
        }),      

        gsap.to('#Scene_1_fg_1', 0, {
            opacity : 0
        })
    ])




    .add([
        gsap.to('#Scene_1_fg_0', 7, {
            y: 0
        }),   
        gsap.to('#Scene_1_layer_0', 6, {
            y: 0
        }),   
        gsap.to('#Scene_1_fog_0', 5, {
            y: 0
        }),         
        gsap.to('#Scene_1_layer_1', 4, {
            y: 0
        }), 
        gsap.to('#Scene_1_fog_1', 3, {
            y: 0
        }),         
        
        gsap.to('#Scene_1_Layer_2', 3, {
            y: 0
        }),             
        gsap.to('#Scene_1_Tower', 3, {
            y: 0
        }),          
        gsap.to('#Scene_1_bg', 2.5, {
            y: 0
        }), 
        gsap.to('.site-header', 2.5, {
            opacity: 0
        }),  
    ])





    .add([
        gsap.to('#Scene_1_fg_0', 2, {
            opacity: 0
        }),        
        gsap.to('#Scene_1_fg_1', 1, {
            opacity: 1
        })
    ])
}

