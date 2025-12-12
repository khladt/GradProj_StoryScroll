

// Function to handle scroll locking/unlocking
function lockScroll() {document.body.style.overflow = 'hidden';}
function unlockScroll() {document.body.style.overflow = '';}



// Function to handle the loader fade-out and scroll unlock
function hideLoader() {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        // Use GSAP to ensure a smooth fade-out effect on the loader
        gsap.to(loader, { 
            opacity: 0, 
            duration: 0.5, 
            ease: "power2.inOut",
            onComplete: () => {
                loader.style.visibility = 'hidden';
                loader.style.pointerEvents = 'none';
                unlockScroll();
            }
        });
    } else {unlockScroll();}
}


let smootherInstance = null; 

function killGSAP() {
    ScrollTrigger.killAll();

    if (smootherInstance) {
        smootherInstance.kill();
        smootherInstance = null; // Clear the reference
        console.log("ScrollSmoother killed.");
    }
    

    console.log("Old GSAP instance destroyed.");
}

function handleResizeOrRotate() {
    // Use a timeout to wait for the resize/rotation to settle and the window.innerWidth to update
    clearTimeout(window.resizeTimer); 
    window.resizeTimer = setTimeout(() => {
        
        // 1. Destroy the old setup
        killGSAP(); 
        
        // 2. Re-initialize the setup
        initGSAP(); 
        
        // 3. Optional: Unlock scroll if it was locked by a previous initGSAP call 
        //    (You'll need to adjust your lockScroll/unlockScroll logic to handle this)
        unlockScroll();

        console.log("GSAP reloaded based on new dimensions.");

    }, 300); // 300ms delay to ensure stable width reading
}




function initGSAP() {
    lockScroll(); 
    
    gsap.registerPlugin(Draggable,DrawSVGPlugin,ScrollTrigger,ScrollSmoother,TextPlugin,RoughEase,ExpoScaleEase,SlowMo,CustomEase,CustomBounce,CustomWiggle)

    
    const parallaxImages = document.querySelectorAll('#story-parallax img');
    
    // Filter out images that are already complete
    const imagesToLoad = Array.from(parallaxImages).filter(img => !img.complete);

    // --- REPLACED PLACEHOLDER WITH YOUR ACTUAL IMAGE LOADING PROMISE ---
    const assetLoadPromise = Promise.all(
        imagesToLoad.map(img => {
            return new Promise(resolve => {
                // Attach load/error handlers to resolve the promise when image is ready
                img.addEventListener('load', resolve);
                img.addEventListener('error', resolve); 
            });
        })
    );
    
    assetLoadPromise.then(() => {
        startGSAP();
        hideLoader(); 
    });
}


function startGSAP() {
    if (window.matchMedia("(min-width: 821px)").matches) {
        // Desktop/Tablet Version
        startDesktopGSAP(); // Renamed your original function to reflect its purpose
    } else {
        // Mobile (Portrait) Version
        startMobileGSAP(); // Run the new, optimized mobile function
    }
}


    const blinkingTimeline = gsap.timeline({
    repeat: -1,
    yoyo: false, 
    paused: false
    });

    blinkingTimeline
    .to('#S3-LE-0', {opacity: 0.0, duration: 1.0 }, "<+=0.5")
    .to('#S3-LE-1', {opacity: 1.0, duration: 0.5 }, "<");

function startDesktopGSAP() {
        smootherInstance = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
            normalizeScroll: true,
            effects: true,
        });


    let runAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: "#story-parallax",
            start: "top top",
            end: () => "+=" + 80 * window.innerHeight,            
            scrub: 1, 
            pin: true,
            anticipatePin: 1,
            pinType: 'transform' // Forces GPU-accelerated pinning
        }
    });

    runAnimation

    //SCENE 1 ANIMATION SECTION


    .fromTo('.dialogue-box',{x:"300vh", y:"-100vh" ,scale: 0.0}, {x:"35vw",y:"-20vh" ,scale: 1, duration: 2 })
    .to('.character-name', {text: "SEVEN", duration: 5 },"<")
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:1,duration:1},"<")
    .call(SevenchangeSequence, ['is-front'])
    .to('.dialogue-text',{text: "Quinnny-Que. KWEEEEEEN.", duration: 9 },"<")


    .fromTo('.site-header', { opacity: 1}, {opacity: 0, duration: 1 },0)
    

    .fromTo('#S1-BG', { y: "-550%"}, {y:"0%", duration: 21 }, 0)
    .fromTo('#S1-TOWER', { y: "-550%"}, {y:"0%", duration: 21 }, 0)
    .fromTo('#S1-FOG-2', { y: "-550%"}, {y:"15%", duration: 21.3 }, 0) 
    .fromTo('#S1-L2', { y: "-550%"}, {y:"-10%", duration: 21 }, 0) 

    .fromTo('#S1-L1', { y: "-550%"}, {y:"1%", duration: 21 }, 0)
    .fromTo('#S1-FOG-1', { y: "-550%"}, {y:"25%", duration: 21.5 }, 0) 
    .fromTo('#S1-L0', { y: "-550%"}, {y:"0%", duration: 20.5 }, 0)
    .fromTo('#S1-FOG-0', { y: "-550%"}, {y:"25%", duration: 20.8 }, 0) 

    .fromTo('#S1-FG', { y: "-550%"}, {y: "20%", duration: 20 }, 0)


    .fromTo('.Seven', 
        {x: "400%" ,y: "1000%"}, {y: "50%", duration: 24}, "<")    

    .fromTo('.Seven', 
        {filter: "brightness(0%)"}, 
        {filter: "brightness(100%) saturate(70%) grayscale(30%)", duration: 16 }, "<+=10") 


    .to('.dialogue-box',{x:"55vw",y:"-40vh" ,scale: 1, duration: 2 },"<+=10")
    .to('.character-name', {text: "SEVEN", duration: 5 })
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:1,duration:1},"<")

    .call(SevenchangeSequence, ['is-front-wave'])
    .to('.dialogue-text',{text: "All clear QUIINNNN!", duration: 9 },"<")

    .to('.dialogue-box',{x:"25vw",y:"-30vh" ,scale: 1, duration: 9 },"+=5")
    .to('.character-name', {text: "QUINN", duration: 7 },"<")
    .to('#chara-quinn',{opacity:1,duration:1},"<")
    .to('#chara-seven',{opacity:0,duration:1},"<")

    .to('.dialogue-text',{text: "SHHHH!. Want us to get caught? Let's just keep moving. *QUITELY*", duration: 15 },"<")
    .fromTo('#S1-QUINN-0', { opacity: 1}, {opacity: 0, duration: 3 },"<")
    .fromTo('#S1-QUINN-1', { opacity: 0}, {opacity: 1, duration: 3 },"<")

    //Scene 1 Ending

    .to('.dialogue-box',{scale: 0, duration: 7 },"+=5")
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:0,duration:1},"<")
    .to('.dialogue-text', {text: "", duration: 0.5},"<")

    .to('#S1-FG', {y: "-5%", duration: 13 },"<") 
    .to('.Seven',{y: "-100%", duration: 9 }, "<")
    .to('#S1-FOG-0', {y:"-15%", duration: 11.5 }, "<")
    .to('#S1-L0', {y:"-50%", duration: 11 }, "<")

    .to('#S1-L1', {y:"-35%", duration: 11 }, "<")
    .to('#S1-FOG-1', {y:"-28%", duration: 10.5 }, "<")

    .to('#S1-L2', {y:"-60%", duration: 10 }, "<")
    .to('#S1-FOG-2', {y:"-30%", duration: 8.5 }, "<")
    .to('#S1-TOWER', {y:"-40%", duration: 8 }, "<")
    .to('#S1-BG', {y:"-50%", duration: 8 },"<")

    .to('#S1-FG', {y: "-100%", duration: 12 }) 
    .to('.Seven',{y: "-100%", duration: 7 }, "<")
    .to('#S1-FOG-0', {y:"-100%", duration: 7 }, "<")
    .to('#S1-L0', {y:"-100%", duration: 7 }, "<")
    .to('#S1-L1', {y:"-100%", duration: 7 }, "<")
    .to('#S1-FOG-1', {y:"-100%", duration: 7 }, "<")
    .to('#S1-L2', {y:"-100%", duration: 7 }, "<")
    .to('#S1-FOG-2', {y:"-100%", duration: 7 }, "<")
    .to('#S1-TOWER', {y:"-100%", duration: 7 }, "<")
    .to('#S1-BG', {y:"-100%", duration: 7 },"<")


//SCENE 2 ANIMATION SECTION
.fromTo('#S2-FG', {y:"250%"}, {y:"-40%", duration: 21 })
.fromTo('#S2-L0', {y:"200%"}, {y:"-30%", duration: 13 },"<")
.fromTo('#S2-L1', {y:"150%"}, {y:"-15%", duration: 11 },"<")
.fromTo('#S2-L2', {y:"100%"}, {y:"-5%", duration: 10 },"<")
.fromTo('#S2-BG', {opacity:0.0,y:"30%"}, {opacity:1.0, y:"-30%", duration: 21 },"<")
.fromTo('#S2-LW', {scale:0.9,opacity:0.0, x:"50vw" ,y:"-315%"}, {opacity:1.0,y:"0%", duration: 20.5 },"<")


//Scene 2 Ending
.to('#S2-FG', {y:"-100%", duration: 25 })
.to('#S2-L0', {y:"-100%", duration: 23 },"<")
.to('#S2-L1', {y:"-100%", duration: 22 },"<")
.to('#S2-L2', {y:"-100%", duration: 21 },"<")
.to('#S2-BG', {opacity:0.0,y:"-100%", duration: 20 },"<")
.to('#S2-LW', {opacity:0.3,y:"100%", duration: 40 },"<")



//SCENE 3 (with S2-LW) ANIMATION SECTION
.fromTo('#S3-L0', {opacity:0.0}, {opacity:1.0,y:"-10%", duration: 1 },"<")
.fromTo('#S3-BG', {opacity:0.0,y:"0%"}, {opacity:1.0,y:"0%", duration: 20 },"<")
.call(() => blinkingTimeline.play(), [], "<")
.to('.dialogue-box', {x:"50vw",y:"-50vh" ,scale: 1, duration: 2 },"<")
.to('.character-name', {text: "SEVEN", duration: 3 },"<")
.to('#chara-quinn', {opacity:0,duration:1},"<")
.to('#chara-seven', {opacity:1,duration:1},"<")

.fromTo('#S3-LE-0', {scale: 0.6,y:"-120%",x:"5%"}, {y:"-30%", duration: 30 },">")
.fromTo('#S3-LE-1', {scale: 0.6,opacity:0.0,y:"-120%",x:"5%"}, {y:"-30%", duration: 30 },"<")

.fromTo('.dialogue-text',{text:""} ,{text: "🎶 Take oOOOOn me (TAKE ON ME) Take mEEEeeEe on (TAKE ON ME) 🎶", duration: 20 },"<")
.fromTo('.dialogue-text',{text:""} ,{text: "🎶 I'LL BEEE GOOONE, IN A DAY OR TWOOOOOOOOOOOOOOOO 🎶", duration: 20 },">+=5")
.to('.dialogue-box', {x:"15vw",y:"-70vh" ,scale: 1, duration: 2 },"<")

.to('#S3-BG', {y:"-20%" ,duration: 30 },"<")
.to('#S3-L0', {y:"-30%",duration: 30 },"<")


.to('#S2-LW', {opacity:0.5,y:"10%",duration: 5},"<+20")

.to('.dialogue-box', {x:"55vw",y:"-40vh" ,scale: 0, duration: 2 },"<")
.to('.dialogue-text', {text: "", duration: 10 },"<")

.to('#S3-LE-0', {y:"-75%",duration: 8 },"<")
.to('#S3-LE-1', {y:"-75%",duration: 8 },"<")
.fromTo('#S3-FG-0', {y:"200%"}, {y:"45%", duration: 10 },"<")
.fromTo('#S3-FG-1', {y:"200%"}, {y:"20%", duration: 12 },"<")
.to('#S2-LW', {scaleY:0.0, opacity:0.0,y:"-5%",duration: 2},"<+=10")
.to('#S3-BG', {y:"-30%" ,duration: 8 },"<")
.to('#S3-L0', {y:"-50%",duration: 8 },"<")
.fromTo('#S3-LS',{opacity:0.0},{opacity:1.0,duration:5},'<')



.call(() => blinkingTimeline.paused(), [], "<")

.to('.dialogue-box', {x:"55vw",y:"-40vh" ,scale: 0, duration: 2 },">")


//Scene 3 Ending
.to('#S3-FG-0', {y:"-30%", duration: 16 })
.to('#S3-FG-1', {y:"-50%", duration: 13 },"<")
.to('#S3-L0', {y:"-100%", duration: 16 },"<")
.to('#S3-LE-0', {y:"-125%", duration: 16 },"<")
.to('#S3-LE-1', {y:"-125%", duration: 16 },"<")
.to('#S3-BG', {y:"-100%", duration: 16 },"<")



//SCENE 2 ANIMATION SECTION
.fromTo('#S2-FG', {y:"250%"}, {y:"-40%", duration: 21 })
.fromTo('#S2-L0', {y:"200%"}, {y:"-30%", duration: 13 },"<")
.fromTo('#S2-L1', {y:"150%"}, {y:"-15%", duration: 11 },"<")
.fromTo('#S2-L2', {y:"100%"}, {y:"-5%", duration: 10 },"<")
.fromTo('#S2-BG', {opacity:0.0,y:"30%"}, {opacity:1.0, y:"-30%", duration: 21 },"<")


//Scene 2 Ending
.to('#S2-FG', {y:"-90%", duration: 25 })
.to('#S2-L0', {y:"-72%", duration: 23 },"<")
.to('#S2-L1', {y:"-73%", duration: 22 },"<")
.to('#S2-L2', {y:"-75%", duration: 21 },"<")
.to('#S2-BG', {opacity:0.0,y:"-60%", duration: 20 },"<")

//Scene 4 Ending

.fromTo('#S4-FG',{scale:1.3,y:'100%',x:'15%'},{y:'15%',duration: 15},'<')


.fromTo('.Quinn-lantern',{y:'10%',x:'-80%', opacity:0.0},{x:'-75%',opacity:1.0,duration: 2})
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{opacity: 1.0,x:'-60%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'-55%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'-50%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')


.to('.Quinn-lantern',{x:'-45%',duration: 2},)
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'-40%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'-35%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'-30%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')


.to('.Quinn-lantern',{x:'-25%',duration: 2},)
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'-20%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'-15%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'-10%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')



.to('.Quinn-lantern',{x:'-5%',duration: 2},)
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'0%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'5%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'10%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')



.to('#S4-FG',{x:'10%',duration: 2})
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('#S4-FG',{x:'5%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('#S4-FG',{x:'0%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('#S4-FG',{x:'-5%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')



.to('#S4-FG',{x:'-10%',duration: 2})
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('#S4-FG',{x:'-15%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'15%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'20%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')



.to('.Quinn-lantern',{x:'25%',duration: 2})
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'30%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'35%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'40%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')



.to('.Quinn-lantern',{x:'45%',duration: 2},)
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'50%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'55%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'60%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')


.to('.Quinn-lantern',{x:'65%',duration: 2},)
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'70%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'75%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'80%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')



.to('.Quinn-lantern',{x:'85%',duration: 2},)
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'90%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'95%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'100%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')


.to('#S4-FG',{y:'-100%',duration: 25})
.to('#S2-FG', {y:"-100%", duration: 15 },"<")
.to('#S2-L0', {y:"-100%", duration: 13 },"<")
.to('#S2-L1', {y:"-100%", duration: 12 },"<")
.to('#S2-L2', {y:"-100%", duration: 11 },"<")
.to('#S2-BG', {opacity:0.0,y:"-100%", duration: 10 },"<")



.fromTo('#S4-FG',{scale:1.3,y:'100%',x:'15%'},{y:'15%',duration: 15},'>')


.fromTo('.Quinn-lantern',{y:'10%',x:'-80%', opacity:0.0},{x:'-75%',opacity:1.0,duration: 2})
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{opacity: 1.0,x:'-60%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'-55%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'-50%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')


.to('.Quinn-lantern',{x:'-45%',duration: 2},)
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'-40%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'-35%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'-30%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')


.to('.Quinn-lantern',{x:'-25%',duration: 2},)
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'-20%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'-15%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'-10%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')



.to('.Quinn-lantern',{x:'-5%',duration: 2},)
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'0%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'5%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'10%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')



.to('#S4-FG',{x:'10%',duration: 2})
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('#S4-FG',{x:'5%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('#S4-FG',{x:'0%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('#S4-FG',{x:'-5%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')



.to('#S4-FG',{x:'-10%',duration: 2})
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('#S4-FG',{x:'-15%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'15%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'20%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')



.to('.Quinn-lantern',{x:'25%',duration: 2})
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'30%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'35%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'40%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')



.to('.Quinn-lantern',{x:'45%',duration: 2},)
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'50%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'55%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'60%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')


.to('.Quinn-lantern',{x:'65%',duration: 2},)
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'70%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'75%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'80%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')



.to('.Quinn-lantern',{x:'85%',duration: 2},)
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'90%',duration: 5})
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'95%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'100%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')













    //All scene Ending
    .to('.site-header',{opacity: 1, duration: 4 },"<")
};





function startMobileGSAP() {

    smootherInstance = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.0,
        normalizeScroll: true,
        effects: true,
    });


    let runAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: "#story-parallax",
            start: "top top",
            end: "+=9000vh", 
            scrub: 1, 
            pin: true,
            anticipatePin: 1,
            pinType: 'transform' // Forces GPU-accelerated pinning
        }
    });

    runAnimation

    //SCENE 1 ANIMATION SECTION
    .to('#chara-quinn',{opacity:0},"<")
    .to('#chara-seven',{opacity:0},"<")

    .fromTo('.site-header', { opacity: 1}, {opacity: 0, duration: 1 },0)
    

    .fromTo('#S1-BG', {scale:2,x:"-0.5%" ,y: "-550%"}, {y:"50%", duration: 11 }, 0)
    .fromTo('#S1-TOWER', {scale:2, y: "-550%"}, {y:"47%", duration: 11 }, 0)
    .fromTo('#S1-FOG-2', {scaleY:2, y: "-550%"}, {y:"65%", duration: 11.3 }, 0) 
    .fromTo('#S1-L2', {scale:1.5,x:"23%" ,y: "-550%"}, {y:"10%", duration: 11 }, 0) 

    .fromTo('#S1-L1', {scale:1.8, y: "-500%"}, {y:"50%", duration: 11 }, 0)
    .fromTo('#S1-FOG-1', {scale:3 ,y: "-550%"}, {y:"120%", duration: 11.5 }, 0) 
    .fromTo('#S1-L0', {scaleY:3 ,y: "-550%"}, {y:"95%", duration: 11 }, 0)
    .fromTo('#S1-FOG-0', {scale:3, y: "-550%"}, {y:"135%", duration: 10.5 }, 0) 


    .fromTo('#S1-QUINN-0', {y: "-550%"},{y: "5.5%"}, 0)
    .fromTo('#S1-QUINN-1', {y: "-550%"},{y: "5.5%"}, 0)
    .fromTo('#S1-FG', {scale:1.7 ,x:"30%",y: "-550%"}, {y: "80%", duration: 10 }, 0)


    .fromTo('.Seven', 
        {scale:1.8 ,x: "400%" ,y: "1000%"}, {y: "250%", duration: 4, duration: 10 }, "<")    

    .fromTo('.Seven', 
        {filter: "brightness(0%) hue-rotate(40deg)"}, 
        {filter: "brightness(90%) hue-rotate(340deg) saturate(70%) grayscale(30%)", duration: 6 }, 5) 


    .fromTo('.dialogue-box',{x:"200vw", y:"-85vh" ,scale: 0.0}, {x:"30vw",y:"-60vh" ,scale: 1, duration: 2 })
    .to('.character-name', {text: "SEVEN", duration: 2 })
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:1,duration:1},"<")

    .call(SevenchangeSequence, ['is-front'])
    .call(SevenchangeSequence, ['is-front-wave'])
    .to('.dialogue-text',{text: "All clear QUIINNNN!", duration: 2 },"<")

    .to('.dialogue-box',{x:"2vw",y:"-30vh" ,scale: 1, duration: 2 },"+=5")
    .to('.character-name', {text: "QUINN", duration: 3 },"<")
    .to('#chara-quinn',{opacity:1,duration:1},"<")
    .to('#chara-seven',{opacity:0,duration:1},"<")

    .to('.dialogue-text', {text: "Then Let's keep moving.", duration: 4 },"<")
    .fromTo('#S1-QUINN-0', { opacity: 1}, {opacity: 0, duration: 1 })
    .fromTo('#S1-QUINN-1', { opacity: 0}, {opacity: 1, duration: 1 },"<")

    //Scene 1 Ending

    .to('.dialogue-box',{scale: 0, duration: 7 },"+=5")
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:0,duration:1},"<")
    .to('.dialogue-text', {text: "", duration: 0.5},"<")

    //Scene 1 Ending

    .to('.dialogue-box',{scale: 0, duration: 7 },"+=5")

    .to('#S1-FG', {y: "-30%", duration: 7 },"<") 
    .to('.Seven',{y: "-50%", duration: 4 }, "<")
    .to('#S1-FOG-0', {y:"-15%", duration: 5.5 }, "<")
    .to('#S1-L0', {y:"-50%", duration: 5 }, "<")

    .to('#S1-L1', {y:"-75%", duration: 4.5 }, "<")
    .to('#S1-FOG-1', {y:"-48%", duration: 4 }, "<")

    .to('#S1-L2', {y:"-80%", duration: 3.5 }, "<")
    .to('#S1-FOG-2', {y:"-30%", duration: 3.5 }, "<")
    .to('#S1-TOWER', {y:"-40%", duration: 3 }, "<")
    .to('#S1-BG', {y:"-35%", duration: 3 }, "<")



    //All scene Ending
    .to('.site-header',{opacity: 1, duration: 4 })

};



//Seven Animations Functions ------------------------------------------------------
const sevenElement = document.querySelector('.Seven');
SevenchangeSequence('is-front') //Initiate Seven Default Animation
function SevenchangeSequence(newClass) {
    sevenElement.className = sevenElement.className.replace(/\bis-\w*\b/g, ''); 
    sevenElement.classList.add(newClass);
}
//---------------------------------------------------------------------------------


//Fullscreen Functions ------------------------------------------------------
const fullscreenToggle = document.getElementById('fullscreenToggle');
fullscreenToggle.addEventListener('click', () =>{
    if (!document.fullscreenElement){document.documentElement.requestFullscreen()}
    else{document.exitFullscreen()}
    updateButtonText();
});

function updateButtonText() {
    // document.fullscreenElement is the standard property to check the current state
    if (document.fullscreenElement){fullscreenToggle.textContent = "Go Fullscreen (F11)";}
    else {fullscreenToggle.textContent = "Exit Fullscreen (F11)";}
}

//------------------------------------------------------------------------------



window.addEventListener("DOMContentLoaded", () => {
    initGSAP();
    
    // Listen for desktop window resize
    window.addEventListener('resize', handleResizeOrRotate); 
    
    // Listen for mobile orientation change
    window.addEventListener('orientationchange', handleResizeOrRotate); 
});