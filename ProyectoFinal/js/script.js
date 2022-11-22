console.log(data);

const main = document.getElementById('main');
const menu = document.getElementById('menu');

const list = () => {
    const ul = document.createElement('ul');
    data.forEach( sec => {
    ul.innerHTML += `<li class="group-report" data-status="off" data-id="${sec.id}">${sec.sectionName}</li>`
    sec.reports.forEach( rep => {
        ul.innerHTML += `<li class="sub-group-report d-none" data-id="${sec.id}">${rep.reportName}</li>`
    }); 
});
    return ul;
}

menu.innerHTML = list().innerHTML;

menu.addEventListener('click', e => {
    const subsAll = document.querySelectorAll(`.sub-group-report`);
    const groupsAll = document.querySelectorAll(`.group-report`);
    const subs = document.querySelectorAll(`.sub-group-report[data-id="${e.target.dataset.id}"]`);
    if (e.target.dataset.status == 'off') {
        groupsAll.forEach( i => i.dataset.status = 'off')
        e.target.dataset.status = 'on';
        subsAll.forEach( i => i.classList.add('d-none'));
        subs.forEach( i => i.classList.remove('d-none'));
    } else if (e.target.dataset.status == 'on') {
        e.target.dataset.status = 'off';
        subs.forEach( i => i.classList.add('d-none'));
    } else {
        const d1 = data.filter(obj => {
            if (obj.id == e.target.dataset.id) {
                return true
            }
        });
        const d2 = d1[0].reports.filter(obj => {
            if (obj.reportName == e.target.innerHTML) {
                return true
            }
        });
        main.innerHTML = `<h2>${e.target.innerHTML}</h2>`
        main.innerHTML += d2[0].reportHTML;
    }
});
