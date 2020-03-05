import React from 'react'
import {Polar} from 'react-chartjs-2'
const Home = ()=>{
    const data = {
        datasets: [{
            data: [10, 20, 30]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    };

    return(<section className="text-center">
        <h1>Dashboard</h1>
        <Polar data={data}/>
        <hr/>
        <img src="https://usercontent2.hubstatic.com/14702929_f520.jpg" alt=""/>
        </section>)
}

export default Home;