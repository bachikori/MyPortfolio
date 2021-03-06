'use strict';

{
    // window.addEventListener('load', (event) => {
    //     document.getElementById('about-btn').addEventListener('click', () => {


    //         let about = document.getElementById('about');
    //         let about_pos = about.getBoundingClientRect();

    //         window.scrollTo(0, about_pos.top);

    //         // about.classList.add('blue');
    //     });

    //     document.getElementById('product-btn').addEventListener('click', () => {


    //         const product = document.getElementById('product');
    //         const product_pos = product.getBoundingClientRect();

    //         window.scrollTo(0, product_pos.top);
    //     });
    // });

    document.getElementById('home-btn').addEventListener('click', () => {
        let home = document.getElementById('home');
        home.scrollIntoView({
            behavior: "smooth"
        });
    })
    document.getElementById('about-btn').addEventListener('click', () => {
        let about = document.getElementById('about');
        about.scrollIntoView({
            behavior: "smooth"
        });
    })
    document.getElementById('product-btn').addEventListener('click', () => {
        let product = document.getElementById('product');
        product.scrollIntoView({
            behavior: "smooth"
        });
    })
    document.getElementById('skill-btn').addEventListener('click', () => {
        let skill = document.getElementById('skill');
        skill.scrollIntoView({
            behavior: "smooth"
        });
    })
    document.getElementById('contact-btn').addEventListener('click', () => {
        let contact = document.getElementById('contact');
        contact.scrollIntoView({
            behavior: "smooth"
        });
    })


}