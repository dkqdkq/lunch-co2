const mealList = document.querySelector(".meal-list");
const kcalDiv = document.querySelector(".kcal-data");
const allergyList = document.querySelector(".allergy-list");

const getMealData = async () => {
    const res = await fetch("/api")
        .then((res) => res.json())
        .then((res) => res.data);
    return res;
};

const allergyInfo = [
    "1. 달걀",
    "2. 우유",
    "3. 메밀",
    "4. 땅콩",
    "5. 대두",
    "6. 밀",
    "7. 고등어",
    "8. 게",
    "9. 새우",
    "10. 돼지고기",
    "11. 복숭아",
    "12. 토마토",
    "13. 아황산",
    "14. 호두",
    "15. 닭고기",
    "16. 쇠고기",
    "17. 오징어",
    "18. 조개류",
    "19. 잣",
];

(async () => {
    const { meal, calories } = await getMealData();
    console.log(meal);
    console.log(calories);
    const menuList = meal.map((item) => {
        return `
        <div class="meal-item">
            <div class="meal-name">
                <p>${item}</p>
            </div>
        </div>
        `;
    });
    mealList.innerHTML = menuList.join("");
    kcalDiv.innerHTML = `<p>${calories}</p>`;
    const allergyData = allergyInfo.map((item) => {
        return `
        <div class="allergy-item">
            <p>${item}</p>
        </div>
        `;
    });
    allergyList.innerHTML = allergyData.join("");
})();
