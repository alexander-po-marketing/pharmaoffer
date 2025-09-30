const suppliers = [
  {
    id: 'sinoway',
    name: 'Sinoway Industrial Co. Ltd',
    subtitle: 'Hangzhou, China · Est. 1993',
    rating: 4.8,
    badge: 'Verified',
    compliance: ['gmp'],
    forms: ['powder'],
    regions: ['asia'],
    response: 24,
    moq: 300,
    price: 460,
    responseScore: 93,
    certifications: ['CEP', 'EDMF'],
    leadTime: '21 days',
    volume: '120T yearly',
    hero: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
    tags: ['GMP', 'In stock', 'Audit ready'],
  },
  {
    id: 'polpharma',
    name: 'Polpharma API',
    subtitle: 'Warsaw, Poland · Est. 1935',
    rating: 4.6,
    badge: 'Premium',
    compliance: ['gmp', 'fda'],
    forms: ['powder'],
    regions: ['europe'],
    response: 48,
    moq: 500,
    price: 495,
    responseScore: 88,
    certifications: ['FDA', 'cGMP'],
    leadTime: '28 days',
    volume: '85T yearly',
    hero: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
    tags: ['cGMP', 'Integrated plant', 'ICH Q7'],
  },
  {
    id: 'temad',
    name: 'Temad Co.',
    subtitle: 'Tehran, Iran · Est. 1977',
    rating: 4.2,
    badge: 'Verified',
    compliance: ['gmp'],
    forms: ['granules', 'powder'],
    regions: ['asia'],
    response: 72,
    moq: 150,
    price: 440,
    responseScore: 81,
    certifications: ['ISO 9001'],
    leadTime: '18 days',
    volume: '60T yearly',
    hero: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
    tags: ['Rapid dispatch', 'Flexible MOQs'],
  },
  {
    id: 'arshine',
    name: 'Arshine Pharmaceutical Co.',
    subtitle: 'Shenzhen, China · Est. 2007',
    rating: 4.5,
    badge: 'Featured',
    compliance: ['gmp', 'who'],
    forms: ['powder'],
    regions: ['asia'],
    response: 24,
    moq: 200,
    price: 455,
    responseScore: 90,
    certifications: ['WHO', 'ISO 14001'],
    leadTime: '16 days',
    volume: '95T yearly',
    hero: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
    tags: ['WHO prequalified', 'Sustainability'],
  },
  {
    id: 'amoli',
    name: 'Amoli Organics Ltd',
    subtitle: 'Mumbai, India · Est. 1979',
    rating: 4.7,
    badge: 'Premium',
    compliance: ['gmp', 'fda'],
    forms: ['powder', 'granules'],
    regions: ['asia'],
    response: 36,
    moq: 400,
    price: 475,
    responseScore: 95,
    certifications: ['US FDA', 'EU GMP'],
    leadTime: '20 days',
    volume: '140T yearly',
    hero: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
    tags: ['24h response', 'CEP ready'],
  },
  {
    id: 'grindeks',
    name: 'Grindeks',
    subtitle: 'Riga, Latvia · Est. 1946',
    rating: 4.3,
    badge: 'Verified',
    compliance: ['gmp', 'fda'],
    forms: ['powder'],
    regions: ['europe'],
    response: 48,
    moq: 220,
    price: 485,
    responseScore: 86,
    certifications: ['GMP', 'FDA'],
    leadTime: '24 days',
    volume: '75T yearly',
    hero: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
    tags: ['Cold chain', 'Full traceability'],
  },
  {
    id: 'teva',
    name: 'Teva API',
    subtitle: 'Netanya, Israel · Est. 1901',
    rating: 4.9,
    badge: 'Premium',
    compliance: ['gmp', 'fda', 'who'],
    forms: ['powder', 'granules'],
    regions: ['europe', 'asia'],
    response: 24,
    moq: 600,
    price: 520,
    responseScore: 97,
    certifications: ['FDA', 'WHO', 'GMP'],
    leadTime: '30 days',
    volume: '200T yearly',
    hero: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
    tags: ['Global supply', 'Audit ready'],
  },
];

const template = document.getElementById('supplier-card-template');
const listEl = document.getElementById('supplier-list');
const resultsCountEl = document.getElementById('results-count');
const selectionBar = document.getElementById('selection-bar');
const selectedCountEl = document.getElementById('selected-count');
const clearSelectionBtn = document.getElementById('clear-selection');
const compareBtn = document.getElementById('compare-btn');
const compareModal = document.getElementById('compare-modal');
const compareContent = document.getElementById('compare-content');
const modalClose = compareModal.querySelector('.modal__close');
const filtersForm = document.getElementById('filters-form');
const moqRange = document.getElementById('moq');
const moqValue = document.getElementById('moq-value');
const resetFiltersBtn = document.getElementById('reset-filters');
const sortOrderSelect = document.getElementById('sort-order');
const bulkCta = document.getElementById('bulk-cta');
const inquiryAction = document.getElementById('inquiry-action');

const state = {
  selected: new Set(),
  filters: {
    compliance: new Set(),
    region: new Set(),
    form: new Set(),
    response: null,
    moq: Number(moqRange?.value || 0),
  },
  sort: 'relevance',
};

const formatCurrency = (value) => `$${value.toLocaleString()} / kg`;

const renderSupplierCard = (supplier) => {
  const card = template.content.firstElementChild.cloneNode(true);
  const checkbox = card.querySelector('.supplier-checkbox');
  const media = card.querySelector('img');
  const badge = card.querySelector('.supplier-badge');
  const title = card.querySelector('h3');
  const subtitle = card.querySelector('.supplier-card__subtitle');
  const ratingValue = card.querySelector('.rating-value');
  const metaList = card.querySelector('.supplier-card__meta');
  const tagsContainer = card.querySelector('.supplier-card__tags');

  checkbox.dataset.id = supplier.id;
  checkbox.checked = state.selected.has(supplier.id);

  media.src = supplier.hero;
  media.alt = `${supplier.name} facility photo`;

  badge.textContent = supplier.badge;
  title.textContent = supplier.name;
  subtitle.textContent = supplier.subtitle;
  ratingValue.textContent = `${supplier.responseScore}%`;

  const metaItems = [
    { label: 'MOQ', value: `${supplier.moq} kg` },
    { label: 'Lead time', value: supplier.leadTime },
    { label: 'Certifications', value: supplier.certifications.join(', ') },
    { label: 'Avg. price', value: formatCurrency(supplier.price) },
  ];

  metaList.innerHTML = metaItems
    .map(
      (item) => `
        <li>
          <span>${item.label}</span>
          ${item.value}
        </li>
      `
    )
    .join('');

  tagsContainer.innerHTML = supplier.tags
    .map((tag) => `<span>${tag}</span>`)
    .join('');

  checkbox.addEventListener('change', (event) => {
    const { checked, dataset } = event.target;
    if (checked) {
      state.selected.add(dataset.id);
    } else {
      state.selected.delete(dataset.id);
    }
    updateSelectionBar();
  });

  return card;
};

const applyFilters = () => {
  const filtered = suppliers.filter((supplier) => {
    const meetsCompliance =
      !state.filters.compliance.size ||
      supplier.compliance.some((item) => state.filters.compliance.has(item));

    const meetsRegion =
      !state.filters.region.size ||
      supplier.regions.some((item) => state.filters.region.has(item));

    const meetsForm =
      !state.filters.form.size ||
      supplier.forms.some((item) => state.filters.form.has(item));

    const meetsResponse =
      !state.filters.response || supplier.response <= Number(state.filters.response);

    const meetsMoq = supplier.moq <= state.filters.moq;

    return meetsCompliance && meetsRegion && meetsForm && meetsResponse && meetsMoq;
  });

  return sortSuppliers(filtered);
};

const sortSuppliers = (list) => {
  const sorted = [...list];
  switch (state.sort) {
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case 'price':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'response':
      sorted.sort((a, b) => a.response - b.response);
      break;
    default:
      sorted.sort((a, b) => b.responseScore - a.responseScore);
  }
  return sorted;
};

const renderSuppliers = () => {
  const filteredSuppliers = applyFilters();
  listEl.innerHTML = '';
  filteredSuppliers.forEach((supplier) => {
    listEl.appendChild(renderSupplierCard(supplier));
  });
  resultsCountEl.textContent = `Showing ${filteredSuppliers.length} supplier${
    filteredSuppliers.length === 1 ? '' : 's'
  }`;
};

const updateSelectionBar = () => {
  const count = state.selected.size;
  selectedCountEl.textContent = `${count} supplier${count === 1 ? '' : 's'} selected`;
  if (count > 0) {
    selectionBar.classList.add('is-active');
  } else {
    selectionBar.classList.remove('is-active');
  }
};

const clearSelection = () => {
  state.selected.clear();
  document
    .querySelectorAll('.supplier-checkbox')
    .forEach((checkbox) => (checkbox.checked = false));
  updateSelectionBar();
};

const openCompareModal = () => {
  const selectedSuppliers = suppliers.filter((supplier) =>
    state.selected.has(supplier.id)
  );

  if (!selectedSuppliers.length) {
    compareModal.setAttribute('hidden', '');
    return;
  }

  const table = document.createElement('table');
  table.className = 'compare-table';
  table.innerHTML = `
    <thead>
      <tr>
        <th>Supplier</th>
        <th>MOQ</th>
        <th>Lead time</th>
        <th>Certifications</th>
        <th>Avg. price</th>
        <th>Response</th>
      </tr>
    </thead>
    <tbody>
      ${selectedSuppliers
        .map(
          (supplier) => `
            <tr>
              <td>${supplier.name}</td>
              <td>${supplier.moq} kg</td>
              <td>${supplier.leadTime}</td>
              <td>${supplier.certifications.join(', ')}</td>
              <td>${formatCurrency(supplier.price)}</td>
              <td>${supplier.response} h</td>
            </tr>
          `
        )
        .join('')}
    </tbody>
  `;

  compareContent.innerHTML = '';
  compareContent.appendChild(table);
  compareModal.removeAttribute('hidden');
};

const initRange = () => {
  if (!moqRange) return;
  const update = () => {
    state.filters.moq = Number(moqRange.value);
    moqValue.textContent = `Up to ${moqRange.value} kg`;
    renderSuppliers();
  };
  moqRange.addEventListener('input', update);
  update();
};

const updateFiltersFromForm = () => {
  const formData = new FormData(filtersForm);
  ['compliance', 'region', 'form'].forEach((key) => {
    state.filters[key] = new Set(formData.getAll(key));
  });
  state.filters.response = formData.get('response');
  renderSuppliers();
};

filtersForm?.addEventListener('change', updateFiltersFromForm);
resetFiltersBtn?.addEventListener('click', () => {
  filtersForm.reset();
  state.filters.compliance.clear();
  state.filters.region.clear();
  state.filters.form.clear();
  state.filters.response = null;
  moqRange.value = 500;
  state.filters.moq = Number(moqRange.value);
  moqValue.textContent = `Up to ${moqRange.value} kg`;
  renderSuppliers();
});

clearSelectionBtn?.addEventListener('click', clearSelection);
compareBtn?.addEventListener('click', () => {
  if (!state.selected.size) return;
  openCompareModal();
});

modalClose?.addEventListener('click', () => {
  compareModal.setAttribute('hidden', '');
});

compareModal?.addEventListener('click', (event) => {
  if (event.target === compareModal) {
    compareModal.setAttribute('hidden', '');
  }
});

bulkCta?.addEventListener('click', () => {
  selectionBar.classList.add('is-active');
});

inquiryAction?.addEventListener('click', () => {
  alert(`Inquiry submitted to ${state.selected.size} suppliers`);
  clearSelection();
});

sortOrderSelect?.addEventListener('change', (event) => {
  state.sort = event.target.value;
  renderSuppliers();
});

initRange();
renderSuppliers();
updateSelectionBar();
