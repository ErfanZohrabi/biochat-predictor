document.getElementById('search-button').addEventListener('click', function() {
    const term = document.getElementById('search-term').value.trim();
    if (!term) {
        alert('Please enter a search term.');
        return;
    }

    // Clear previous results
    document.getElementById('ensembl-results').innerHTML = '<h2>Ensembl Results</h2>';
    document.getElementById('ena-results').innerHTML = '<h2>EBI ENA Results</h2>';
    document.getElementById('ddbj-results').innerHTML = '<h2>DDBJ Results</h2>';
    document.getElementById('uniprot-results').innerHTML = '<h2>UniProt Results</h2>';
    document.getElementById('ncbi-results').innerHTML = '<h2>NCBI Results</h2>';
    document.getElementById('github-results').innerHTML = '<h2>GitHub Results</h2>';
    document.getElementById('summary-content').innerHTML = 'Searching...';

    // Initiate searches
    searchEnsembl(term);
    searchENA(term);
    searchDDBJ(term);
    searchUniProt(term);
    searchNCBI(term);
    searchGitHub(term);
});

// Search Ensembl
function searchEnsembl(term) {
    fetch(`https://rest.ensembl.org/lookup/symbol/homo_sapiens/${term}?content-type=application/json`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('ensembl-results');
            if (data.id) {
                const p = document.createElement('p');
                p.innerHTML = `Gene: <a href="https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=${data.id}" target="_blank">${data.display_name}</a>`;
                resultsDiv.appendChild(p);
                updateSummary('gene', data);
            } else {
                resultsDiv.innerHTML += '<p>No results found.</p>';
            }
        })
        .catch(error => {
            document.getElementById('ensembl-results').innerHTML += '<p>Error fetching results.</p>';
            console.error('Ensembl Error:', error);
        });
}

// Search EBI ENA
function searchENA(term) {
    fetch(`https://www.ebi.ac.uk/ena/portal/api/search?query=${term}&result=sequence&limit=5`)
        .then(r => r.json())
        .then(d => {
            updateResults('ena', d.length ? d.map(h => `<a href="https://www.ebi.ac.uk/ena/browser/view/${h.accession}" target="_blank">${h.accession}</a>`).join('<br>') : 'No results');
            if (d.length) updateSummary('sequence', d[0]); // Pass first hit for summary
        })
        .catch(e => error('ena', e));
}

// Search DDBJ
function searchDDBJ(term) {
    fetch(`https://ddbj.nig.ac.jp/api/search?query=${term}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('ddbj-results');
            if (data.results && data.results.length > 0) {
                data.results.slice(0, 5).forEach(result => {
                    const p = document.createElement('p');
                    p.innerHTML = `Sequence: <a href="https://ddbj.nig.ac.jp/view/${result.id}" target="_blank">${result.id}</a>`;
                    resultsDiv.appendChild(p);
                });
                // Update summary if applicable
                updateSummary('sequence', data.results[0]); // Assuming the first result is relevant
            } else {
                resultsDiv.innerHTML += '<p>No results found.</p>';
            }
        })
        .catch(error => {
            document.getElementById('ddbj-results').innerHTML += '<p>Error fetching results.</p>';
            console.error('DDBJ Error:', error);
        });
}

// Search UniProt
function searchUniProt(term) {
    fetch(`https://rest.uniprot.org/uniprotkb/search?query=${term}&size=5&format=json`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('uniprot-results');
            if (data.results && data.results.length > 0) {
                data.results.forEach(result => {
                    const p = document.createElement('p');
                    const name = result.proteinDescription?.recommendedName?.fullName?.value || 'No name';
                    p.innerHTML = `<a href="https://www.uniprot.org/uniprotkb/${result.primaryAccession}" target="_blank">${result.primaryAccession}</a> - ${name}`;
                    resultsDiv.appendChild(p);
                });
                if (data.results[0].proteinDescription) updateSummary('protein', data.results[0]);
            } else {
                resultsDiv.innerHTML += '<p>No results found.</p>';
            }
        })
        .catch(error => {
            document.getElementById('uniprot-results').innerHTML += '<p>Error fetching results.</p>';
            console.error('UniProt Error:', error);
        });
}

// Search NCBI
function searchNCBI(term) {
    fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=gene&term=${term}&retmode=json&retmax=5`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('ncbi-results');
            if (data.esearchresult && data.esearchresult.idlist.length > 0) {
                data.esearchresult.idlist.forEach(id => {
                    const p = document.createElement('p');
                    p.innerHTML = `<a href="https://www.ncbi.nlm.nih.gov/gene/${id}" target="_blank">${id}</a>`;
                    resultsDiv.appendChild(p);
                });
            } else {
                resultsDiv.innerHTML += '<p>No results found.</p>';
            }
        })
        .catch(error => {
            document.getElementById('ncbi-results').innerHTML += '<p>Error fetching results.</p>';
            console.error('NCBI Error:', error);
        });
}

// Search GitHub
function searchGitHub(term) {
    fetch(`https://api.github.com/search/repositories?q=${term}+bioinformatics`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('github-results');
            if (data.items && data.items.length > 0) {
                data.items.slice(0, 5).forEach(item => {
                    const p = document.createElement('p');
                    p.innerHTML = `Repo: <a href="${item.html_url}" target="_blank">${item.full_name}</a>`;
                    resultsDiv.appendChild(p);
                });
            } else {
                resultsDiv.innerHTML += '<p>No relevant repositories found.</p>';
            }
        })
        .catch(error => {
            document.getElementById('github-results').innerHTML += '<p>Error fetching results.</p>';
            console.error('GitHub Error:', error);
        });
}

// Update Summary Box
function updateSummary(type, data) {
    const s = document.getElementById('summary-content');
    if (type === 'gene') {
        s.innerHTML = `Gene: ${data.display_name || 'N/A'}<br>Desc: ${data.description || 'N/A'}`;
    } else if (type === 'protein') {
        s.innerHTML = `Protein: ${data.proteinDescription?.recommendedName?.fullName?.value || 'N/A'}<br>Function: ${data.comments?.find(c => c.commentType === 'FUNCTION')?.texts[0]?.value || 'N/A'}`;
    } else if (type === 'sequence' && data.accession) {
        s.innerHTML = `Sequence: ${data.accession}<br>Desc: ${data.description || 'N/A'}`;
    }
}