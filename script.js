

let product = {
  plainBurger: {
    name: "Гамбургер классический",
    price: 150,
    kcall: 700,
    img: 'images/product2.jpg',
    amount: 0,
    get Summ() {
      return this.price * this.amount;
    },
    get Kcall() {
        return this.kcall * this.amount;
    }
  },
  freshBurger: {
      name: 'Гамбургер FRESH',
      price: 250,
      kcall: 900,
      img: 'images/product1.jpg',
      amount: 0,
      get Summ() {
        return this.price * this.amount;
      },
      get Kcall() {
          return this.kcall * this.amount;
      }
  },
  freshCombo: {
      name: 'FRESH COMBO',
      price: 600,
      kcall: 1500,
      img: 'images/product3.jpg',
      amount: 0,
      get Summ() {
        return this.price * this.amount;
      },
      get Kcall() {
          return this.kcall * this.amount;
      }
  },
  freshCom: {
    name: 'FRESH STEAK',
    price: 700,
    kcall: 11500,
    img: 'https://avatars.mds.yandex.net/i?id=5c043529cb291c55f648a9b4936e7261799562fc-8375627-images-thumbs&n=13',
    amount: 0,
    get Summ() {
      return this.price * this.amount;
    },
    get Kcall() {
        return this.kcall * this.amount;
    }
},
combomac: {
    name: 'Coco Bongo',
    price: 850,
    kcall: 2500,
    img: 'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663796853_1-mykaleidoscope-ru-p-burger-i-kola-yeda-krasivo-1.jpg',
    amount: 0,
    get Summ() {
      return this.price * this.amount;
    },
    get Kcall() {
        return this.kcall * this.amount;
    }
},
};


// Доп продукция

let extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 1000,
        kcall: 100,
    },
    lettuce: {
        name: 'Салатный лист',
        price: 2000,
        kcall: 5,
    },
    cheese: {
        name: 'Сыр',
        price: 3000,
        kcall: 150,
    },
    ketchup: {
        name: 'Кетчуп острый',
        price: 3000,
        kcall: 150,
    },
};

let str = '';

function createBurgers(){
    let main = document.querySelector('.main');
    for(let key in product){
        let {name, img, descr, price} = product[key];
        str += `<section class="main__product" id="${key}">
        <div class="main__product-preview">
            <div class="main__product-info">
                <img src="${img}" alt="" class="main__product-img">
                <h2 class="main__product-title">${name}
                    <span class="main__product-many">${price} руб.</span>
                </h2>
            </div>
        </div>
        <div class="main__product-extra">
            <div class="main__product-number">
                <a class="main__product-btn fa-reg minus" data-symbol="-"></a>
                <output class="main__product-num">0</output>
                <a class="main__product-btn fa-reg plus" data-symbol="+"></a>
            </div>
        </div>
        <div class="main__product-extraProduct">`
        for(let newKey in extraProduct) {
            str += `<label class="main__product-label">
            <input type="checkbox" class="main__product-checkbox"
            data-extra="${newKey}">
            <span class="main__product-check"></span>
            ${extraProduct[newKey].name}
            </label>`
        }
         str += `</div>
         </section> `
    }
    main.innerHTML = str;
    market();
}

setTimeout(() => createBurgers(),2000);



function market () {
    




let btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptOut = document.querySelector('.receipt__window-out'),
    receiptBtn = document.querySelector('.receipt__window-btn');


btnPlusOrMinus.forEach(function(btn) {
    btn.addEventListener('click', function() {
        plusOrMinus(this)
    })
})

function plusOrMinus(element) {
    // closest() - подключаеться к указаному родительскому элементу
    let parentId = element.closest('.main__product').getAttribute('id'),
        out = element.closest('.main__product').querySelector('.main__product-num'),
        price = element.closest('.main__product').querySelector('.main__product-price span'),
        kcall = element.closest('.main__product').querySelector('.main__product-kcall span');

        if(element.getAttribute('data-symbol') == '+') {
           product[parentId].amount++
        }else if(element.getAttribute('data-symbol') == '-' && product[parentId].amount > 0) {
            product[parentId].amount--
        }

        out.innerHTML = product[parentId].amount;
        price.innerHTML = product[parentId].Summ;
        kcall.innerHTML = product[parentId].Kcall;
}


for(let i = 0; i < checkExtraProduct.length;i++) {
    checkExtraProduct[i].addEventListener('click', function() {
        addExtraProduct(this);
    })
}

function addExtraProduct(el) {
    let parent = el.closest('.main__product');
        parentId = parent.getAttribute('id');

        product[parentId][el.getAttribute('data-extra')] = el.checked;

        let price = parent.querySelector('.main__product-price span'),
            kcall = parent.querySelector('.main__product-kcall span'),
            elDataInfo = el.getAttribute('data-extra');

        
        if(product[parentId][elDataInfo] == true) {
            product[parentId].price += extraProduct[elDataInfo].price;
            product[parentId].kcall += extraProduct[elDataInfo].kcall;
        }else {
            product[parentId].price -=  extraProduct[elDataInfo].price;
            product[parentId].kcall -=  extraProduct[elDataInfo].kcall;
        }

        price.innerHTML = product[parentId].Summ;
        kcall.innerHTML = product[parentId].Kcall;
        
}

let arrProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;


addCart.addEventListener('click', function() {
    for(let key in product) {
        let productObj = product[key];
        if(productObj.amount > 0) {
            arrProduct.push(productObj);
            for(let newKey in productObj) {
                if(productObj[newKey] === true) {
                    productObj.name += '\n' + extraProduct[newKey].name;
                }
            }
        }
        productObj.price = productObj.Summ;
        productObj.kcall =  productObj.Kcall;
    }
    for(let i = 0; i < arrProduct.length; i++) {
        let el = arrProduct[i];
        totalName += '\n' + el.name + '\n'
        totalPrice += el.price
        totalKcall += el.kcall
    }
    receiptOut.innerHTML = `Заказ: \n ${totalName} \nКаллорийость ${totalKcall} 
    общая стоимость заказа ${totalPrice} руб.`

    receipt.style.display = 'flex';
    receipt.style.opacity = '1';
    receiptWindow.style.top = '0';

    let outNum = document.querySelectorAll('.main_-product-num'),
        outPrice = document.querySelectorAll('.main__product-price span'),
        outKcall = document.querySelectorAll('.main__product-kcall span');

    for(let i = 0; i < outNum.length;i++) {
        outNum[i].innerHTML = 0;
        outPrice[i].innerHTML = 0;
        outKcall[i].innerHTML = 0;
    }    
})    

receiptBtn.addEventListener(' click', function() {
    location.reload();
})
}