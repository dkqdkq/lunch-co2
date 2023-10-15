const meal = document.querySelector(".meal");

const getMeal = async () => {
    const res = await fetch("/api/menu")
        .then((res) => res.json())
        .then((res) => res.data);
    return res;
};

(async () => {
    const menu = await getMeal();
    console.log(menu);
    const menuList = menu.map((item) => {
        return `
        <div class="meal-item">
            <div class="meal-name">
                <p>${item}</p>
            </div>
        </div>
        `;
    });
    meal.innerHTML = menuList.join("");
})();
