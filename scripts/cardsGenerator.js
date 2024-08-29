document.addEventListener('DOMContentLoaded', () => {
    const cakesContainer = document.getElementById('productCardsCntOfCakes');
    const cupcakesContainer = document.getElementById('productCardsCntOfCupCakes');

    const products = {
        cakes: [
            { title: 'Cake 1', imageUrl: 'images/cakes images/cake1.jpg', price: 'Rs 1000' },
            { title: 'Cake 2', imageUrl: 'images/cakes images/cake2.jpg', price: 'Rs 1200' },
            { title: 'Cake 3', imageUrl: 'images/cakes images/cake3.jpg', price: 'Rs 1400' },
            { title: 'Cake 4', imageUrl: 'images/cakes images/cake4.jpg', price: 'Rs 1000' },
            { title: 'Cake 5', imageUrl: 'images/cakes images/cake5.jpg', price: 'Rs 4000' },
            { title: 'Cake 6', imageUrl: 'images/cakes images/cake6.jpg', price: 'Rs 1000' },
        ],
        cupcakes: [
            { title: 'Cupcake 1', imageUrl: 'images/cakes images/cake1.jpg', price: 'Rs 1000' },
            { title: 'Cupcake 2', imageUrl: 'images/cakes images/cake1.jpg', price: 'Rs 1000' },
            { title: 'Cupcake 3', imageUrl: 'images/cakes images/cake1.jpg', price: 'Rs 1000' },
            { title: 'Cupcake 4', imageUrl: 'images/cakes images/cake1.jpg', price: 'Rs 1000' },
            { title: 'Cupcake 5', imageUrl: 'images/cakes images/cake1.jpg', price: 'Rs 1000' },
            { title: 'Cupcake 6', imageUrl: 'images/cakes images/cake1.jpg', price: 'Rs 1000' },
        ]
    };

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';

        const imageDiv = document.createElement('div');
        imageDiv.className = 'product-card__image';
        const img = document.createElement('img');
        img.src = product.imageUrl;
        img.alt = product.title;
        imageDiv.appendChild(img);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'product-card__info';
        const title = document.createElement('h2');
        title.className = 'product-card__title';
        title.textContent = product.title;
        const description = document.createElement('p');
        description.className = 'product-card__description';
        description.textContent = 'This one pound size cake price.';
        const priceRow = document.createElement('div');
        priceRow.className = 'product-card__price-row';
        const price = document.createElement('span');
        price.className = 'product-card__price';
        price.textContent = product.price;
        const button = document.createElement('a');
        button.href = "#orderForm";
        button.className = 'product-card__btn';
        button.textContent = 'Buy';

        priceRow.appendChild(price);
        priceRow.appendChild(button);
        infoDiv.appendChild(title);
        infoDiv.appendChild(description);
        infoDiv.appendChild(priceRow);

        card.appendChild(imageDiv);
        card.appendChild(infoDiv);

        return card;
    }

    function renderProducts(products, container) {
        const row1 = document.createElement('div');
        row1.id = 'productCardsRow1';
        const row2 = document.createElement('div');
        row2.id = 'productCardsRow2';

        products.forEach((product, index) => {
            const card = createProductCard(product);
            if (index < 3) {
                row1.appendChild(card);
            } else {
                row2.appendChild(card);
            }
        });

        container.appendChild(row1);
        container.appendChild(row2);
    }

    renderProducts(products.cakes, cakesContainer);
    renderProducts(products.cupcakes, cupcakesContainer);

    // Selecting elements from the DOM
    const incrementBtn = document.querySelector(".quantity #increment");
    const decrementBtn = document.querySelector(".quantity #decrement");

    const priceElem = document.querySelector(".product .small");
    const subPriceElem = document.querySelector("#subTotal");
    const shippingFeeElem = document.querySelector("#shippingFee");
    const totalPriceElem = document.querySelector("#totalPrice");
    const quantityElem = document.querySelector(".quantity label");
    const cakeSizesElem = document.querySelectorAll(".product #rightProduct #radio #pound");

    const productCardTitles = document.querySelectorAll(".product-card__title");
    const productCardsBtns = document.querySelectorAll(".product-card__btn");

    const cartTitle = document.querySelector(".product span");
    const cartImg = document.querySelector(".product img");
    const quantityInput = document.getElementById('quantityInput');
    const cakeNameInput = document.getElementById('cakeNameInput');

    // Initial values
    let quantity = 1;
    let selectedCake = "Cake 1";
    const shippingFee = 200;
    let cakeSize = 1;

    // Image mapping
    const cakeImages = {
        "Cake 1": { image: "images/cakes images/cake1.jpg", price: "Rs1000" },
        "Cake 2": { image: "images/cakes images/cake2.jpg", price: "Rs1200" },
        "Cake 3": { image: "images/cakes images/cake3.jpg", price: "Rs1400" },
        "Cake 4": { image: "images/cakes images/cake4.jpg", price: "Rs1000" },
        "Cake 5": { image: "images/cakes images/cake5.jpg", price: "Rs4000" },
        "Cake 6": { image: "images/cakes images/cake6.jpg", price: "Rs1000" }
    };

    function updatePrice() {
        const cakePrice = parseInt(cakeImages[selectedCake].price.replace("Rs", ""), 10);
        const price = cakePrice * quantity;
        const finalPrice = price * cakeSize;

        priceElem.innerText = `Rs${finalPrice}`;
        subPriceElem.innerText = `Rs${finalPrice}`;
        shippingFeeElem.innerText = `Rs${shippingFee}`;

        const totalPrice = finalPrice + shippingFee;
        totalPriceElem.innerHTML = `<sup>RS</sup>${totalPrice}`;

        quantityInput.value = quantity;
        cakeNameInput.value = selectedCake;
    }

    function updateCart() {
        productCardsBtns.forEach((productCardsBtn, index) => {
            productCardsBtn.addEventListener("click", () => {
                selectedCake = productCardTitles[index].innerText;
                priceElem.innerText = cakeImages[selectedCake].price * cakeSize;
                cartTitle.innerText = selectedCake;
                cartImg.src = cakeImages[selectedCake].image;
                updatePrice();
            });
        });
    }

    incrementBtn.addEventListener("click", () => {
        quantity++;
        quantityElem.innerText = quantity;
        updatePrice();
    });

    decrementBtn.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            quantityElem.innerText = quantity;
            updatePrice();
        }
    });

    function updateCakeSize() {
        cakeSizesElem.forEach((cakeSizeElem) => {
            cakeSizeElem.addEventListener("click", () => {
                cakeSize = cakeSizeElem.value;
                updatePrice();
            })
        });
    }

    updateCart();
    updatePrice();
    updateCakeSize();

});