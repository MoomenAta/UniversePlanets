/*TYPES*/

type Planet = {
    id:number,
    name:string[],
    describtion:string[],
    img:string,
    bgimg:string,
    info:{id:number,text:string[]}[],
};

/****************************/
let planetsContainer = document.querySelector('[data-planetscontainer]') as HTMLElement;
let langChanger = document.querySelector('[data-lang]') as HTMLElement;
let targetElement:HTMLElement;

let n:number = 1;
let dir:string = "ltr";
let displayPlanets = async () : Promise<void> =>
{
    planetsData = await fetchData();
    planetsData.map((planet:Planet)=>{
        let s:string = `
        <div class="planet">
            <button type="button" data-close>Close</button>
            <img data-planetimg src='${planet.img}' alt="${planet.name[0]}" />
            <span>${planet.id + 1}</span>
            <div class="spacer"></div>
            <div class="planetContent">
                <div class="textPlanet">
                    <h2 style="direction:${dir}">${planet.name[n]}</h2>
                    <p style="direction:${dir}">${planet.describtion[n]}</p>
                </div>
                <div data-info class="moreInfo">
                    <p style="direction:${dir}"><strong>${planet.info[0].id + 1}- </strong>${planet.info[0].text[n]}</p>
                    <p style="direction:${dir}"><strong>${planet.info[1].id + 1}- </strong>${planet.info[1].text[n]}</p>
                    <p style="direction:${dir}"><strong>${planet.info[2].id + 1}- </strong>${planet.info[2].text[n]}</p>
                </div>
                
            </div>
            <div class="bgimg">
            <img data-bgimg src='${planet.bgimg}' alt="${planet.name[0]}" />
            </div>
            <button data-button type="button">Go</button>
        </div>
        `
        planetsContainer.innerHTML += s;
    })
}



let planetsData = [];
let fetchData = async () : Promise<[]> => {
    let getdata = await fetch('../planetsData.json');
    let data = await getdata.json();
    let actualData = await data.planets;
    return actualData;
}

function performAction() :void
{
    let allElements = document.querySelectorAll(`header,.mainContent h1 ,.planet`) as NodeListOf<HTMLElement>;
    let buttons = document.querySelectorAll('[data-button]') as NodeListOf<HTMLElement>;
    let buttonsclose = document.querySelectorAll('[data-close]') as NodeListOf<HTMLElement>;
    let infoDivs = document.querySelectorAll('[data-info]') as NodeListOf<HTMLElement>;
    

    let hideElements = () :void =>
    {
        let selectedEle = document.querySelector('[data-selected]') as HTMLElement
        allElements.forEach((ele)=>
        {
            if(!(ele === selectedEle ))
            {
                ele.classList.add('hideElements')
            }
        })
    }

    let showElements = () :void =>
    {
        let selectedEle = document.querySelector('[data-selected]') as HTMLElement
        allElements.forEach((ele)=>
        {
            if(!(ele === selectedEle ))
            {
                ele.classList.remove('hideElements')
            }
        })
    }

    buttons.forEach((button:HTMLElement,i:number)=>
    {
        button.onclick = (e:Event) =>
        {
            let eventElement = e.currentTarget as HTMLElement;
            let planetElement = eventElement.parentElement as HTMLElement;
            planetElement.setAttribute('data-selected',"");
            hideElements();
            planetElement.classList.add('scaleEle');
            setTimeout(()=>
            {
                planetElement.classList.add('scaleAnimation');
            },1000)

            setTimeout(()=>
            {
                infoDivs[i].classList.add('moreInfoShow');
            },2000)
            
        }
    })

    buttonsclose.forEach((button:HTMLElement,i:number)=>{
        button.onclick = (e:Event) =>
        {
            let selectedEle = document.querySelector('[data-selected]')
            infoDivs[i].classList.remove('moreInfoShow');
            selectedEle.classList.remove('scaleAnimation')
            setTimeout(()=>
            {
                showElements();
                selectedEle.classList.remove('scaleEle');
                selectedEle.removeAttribute("data-selected");
                planetsContainer.scrollTo(i*200,0)
            },1000)
            
        }
    })
}

window.addEventListener('load', async() :Promise<void> =>
{
    await displayPlanets();

    performAction();

    langChanger.onclick = async () :Promise<void>=>
    {
        if(n==0)
        {
            n = 1;
            dir="ltr";
            langChanger.innerHTML="AR"
            planetsContainer.innerHTML = "";
            await displayPlanets();
            performAction();
        }
        else
        {
            n = 0;
            dir="rtl";
            langChanger.innerHTML="EN"
            planetsContainer.innerHTML = "";
            await displayPlanets();
            performAction();
        }
    }
})

