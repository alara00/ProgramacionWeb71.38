const searchBar = document.querySelector('#searchBar');
const searchContainer = document.querySelector('#searchContainer');


const manageSearch = () => {
    if (searchBar.value == ''){
        searchContainer.classList.add('off');
    } else {
        searchContainer.classList.remove('off');
        renderSearch();
    }
}

searchBar.addEventListener('keyup', () => {
    manageSearch();
});
searchBar.addEventListener('search', () => {
    manageSearch();
});

const renderSearch = () => {
    searchContainer.innerHTML = '';
    const filterList = data.filter( item => {
        const ind1 = item.sectionName.toUpperCase().indexOf(searchBar.value.toUpperCase());
        const ind2 = item.sectionDescription.toUpperCase().indexOf(searchBar.value.toUpperCase());
        const ind3 = item.reports.reduce((ind, reporte) => {
            return ind | (reporte.reportName.toUpperCase().indexOf(searchBar.value.toUpperCase()) != -1);
        }, false);

        console.log('ind3', ind3);
        
        if (ind1 >= 0 || ind2 >= 0 || ind3) {
            return true;    
        }
    });

    filterList.forEach( item => {
        searchContainer.append(searchUI(item));
    });

}

const searchUI = (item) => {
    console.log('searchUI', item);
    const div = document.createElement('div');
    div.classList.add('searchCard');
    const ini = `
        <div class="searchCardTop">
            <h2><i class="fa-solid fa-arrow-trend-up"></i>${item.sectionName}</h2>
            <p>${item.sectionDescription}</p>
        </div>
        <div class="searchCardBot">
    `;

    let aBots = '';
    item.reports.forEach( (repo,i) => {
        console.log('repo:', repo);
        aBots += `<a class="searchRepo" href="#" data-id="${item.id}" data-repo="${i}">${repo.reportName}</a>`;
    });

    div.innerHTML = ini + aBots + '</div>';

    console.log('div.innerHTML:', div.innerHTML);

    const searchBut = div.querySelectorAll('.searchRepo');
    const searchBut1 = div.querySelector('.searchRepo');
    
    console.log(searchBut);
    console.log(searchBut1);
    
    searchBut.forEach( bot => {
        bot.addEventListener('click', () => {
            const trgtCat = document.querySelector(`.group-report[data-id="${bot.dataset.id}"]`);
            if (trgtCat.dataset.status = 'off') {
                trgtCat.click();
            }
            const trgtRep = document.querySelectorAll(`.sub-group-report[data-id="${bot.dataset.id}"]`); 
            trgtRep[bot.dataset.repo].click();
            searchBar.value = '';
            manageSearch();
        });
    });  
    
    return div;
}