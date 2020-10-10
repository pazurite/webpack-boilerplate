import "./styles.scss";

const root = document.querySelector('#app');

// console.log(Array(20))
[...Array(20)].map((n, i) => {
    const max = i + 1;
    console.log('max', max)

    let currentNumber = max

    let container = document.createElement('div');

    container.className = 'row'


    root.appendChild(container);


    const numbers = [...Array(max)].reduce((result, rowN, rowIndex) => {
        result.splice(max - currentNumber, 0, currentNumber.toString().charAt(currentNumber.toString().length - 1))

        if (rowIndex % 2 !== 0) {
            currentNumber--
        }

        return result
    }, [])


    numbers.forEach(n => {
        const p = document.createElement('p')

        p.textContent = n

        container.appendChild(p)
    })
})



