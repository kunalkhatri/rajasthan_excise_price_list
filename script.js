window.addEventListener("load",runthisonstartup);

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });


async function runthisonstartup(){
    const data_json = await fetch("price_list.json");
    // console.log(data_json);
    const data = await data_json.json();
    console.log(data);
    for (let row in data) {
        document.getElementById('price_list').appendChild(create_a_card(row,data[row]));
    }


    function create_a_card(title,data){
        const div = createElement("div","card-wrapper");
            const title_div = createElement("div","product-name",null,title);
            const pricing_div = createElement("div","product-pricing");
            data.sizes.forEach((size)=>{
                let size_box = createElement("div","size-box");
                size_box.appendChild(createElement("div","size_name",null,size.size_name));
                size_box.appendChild(createElement("div","size_price",null, formatter.format(size.price)));

                pricing_div.appendChild(size_box);

            });

        div.appendChild(title_div);
        div.appendChild(pricing_div);   
        return div;
    }

    function createElement(tagName, classes, attributes,text) {
        const element = document.createElement(tagName);
        if (classes) {
          element.classList.add(...classes.split(' '));
        }
        if (attributes) {
          for (let attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
          }
        }

        if (text) {
            element.innerText = text;
        }
        return element;
      }

      
}

document.getElementById("text-search").addEventListener("input",(event)=>{
    var search_text = document.getElementById("text-search").value;
    if (search_text.length == 0) {
        console.log("Resetting filters");
        document.querySelectorAll("div.card-wrapper").forEach(el=>el.style.display="");
    }

    document.querySelectorAll("div.card-wrapper").forEach(el=>{el.style.display = hasText(el,search_text)?"":"none" });
    function hasText(el,search_text){
        return el.querySelector("div.product-name").innerText.toLowerCase().includes(search_text.toLowerCase());

    }
})