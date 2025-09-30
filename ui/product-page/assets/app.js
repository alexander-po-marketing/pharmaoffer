const suppliers = [
  {
    id: 'arshine',
    name: 'Arshine Pharmaceutical Co.',
    subtitle: 'Shenzhen, China · Est. 2007',
    rating: 4.6,
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
    logo: 'https://pharmaoffer.com/media/cache/rmcl/upload/logo/logo-Arshine.webp?version=20252209',
    facility:
      'https://pharmaoffer.com/media/cache/rmci/upload/picture/656749f005ad5315033402.webp',
    tags: ['WHO prequalified', 'Sustainability'],
  },
  {
    id: 'sinoway',
    name: 'Sinoway Industrial Co. Ltd',
    subtitle: 'Hangzhou, China · Est. 1993',
    rating: 4.8,
    badge: 'Verified',
    compliance: ['gmp'],
    forms: ['powder'],
    regions: ['asia'],
    response: 18,
    moq: 250,
    price: 462,
    responseScore: 93,
    certifications: ['CEP', 'EDMF'],
    leadTime: '19 days',
    volume: '120T yearly',
    logo: 'https://pharmaoffer.com/media/cache/rmcl/upload/logo/sinoway-industrial-co-ltd.webp?version=20252509',
    facility:
      'https://pharmaoffer.com/media/cache/rmci/upload/picture/67fcdcab3b980775300906.webp',
    tags: ['GMP', 'In stock', 'Audit ready'],
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
    response: 40,
    moq: 150,
    price: 440,
    responseScore: 81,
    certifications: ['ISO 9001'],
    leadTime: '18 days',
    volume: '60T yearly',
    logo: 'https://pharmaoffer.com/media/cache/rmcl/upload/logo/temad-co.webp?version=20252309',
    facility:
      'https://pharmaoffer.com/media/cache/rmci/upload/picture/6540ceb79c522044017715.webp',
    tags: ['Rapid dispatch', 'Flexible MOQs'],
  },
  {
    id: 'senova',
    name: 'Senova Technology Co. Ltd',
    subtitle: 'Shandong, China · Est. 2011',
    rating: 4.4,
    badge: 'Verified',
    compliance: ['gmp'],
    forms: ['powder', 'granules'],
    regions: ['asia'],
    response: 28,
    moq: 180,
    price: 470,
    responseScore: 87,
    certifications: ['GMP', 'ISO 9001'],
    leadTime: '20 days',
    volume: '80T yearly',
    logo: 'https://pharmaoffer.com/media/cache/rmcl/upload/logo/senova-technology-co-ltd.webp?version=20252209',
    facility:
      'https://pharmaoffer.com/media/cache/rmci/upload/picture/63f8a9d778c63910140304.webp',
    tags: ['Ready stock', 'Regulatory support'],
  },
  {
    id: 'lgm-pharma',
    name: 'LGM Pharma',
    subtitle: 'Boca Raton, USA · Est. 2006',
    rating: 4.7,
    badge: 'Premium',
    compliance: ['gmp', 'fda'],
    forms: ['powder'],
    regions: ['americas'],
    response: 22,
    moq: 320,
    price: 515,
    responseScore: 94,
    certifications: ['US FDA', 'cGMP'],
    leadTime: '22 days',
    volume: '110T yearly',
    logo: 'https://pharmaoffer.com/media/cache/rmcl/upload/logo/x.webp?version=20252209',
    facility:
      'https://pharmaoffer.com/media/cache/rmci/upload/picture/64c10bb925a82131199569.webp',
    tags: ['Regulatory support', 'North America hub'],
  },
  {
    id: 'duchefa',
    name: 'Duchefa Farma B.V.',
    subtitle: 'Haarlem, Netherlands · Est. 1986',
    rating: 4.5,
    badge: 'Featured',
    compliance: ['gmp', 'fda'],
    forms: ['powder'],
    regions: ['europe'],
    response: 32,
    moq: 210,
    price: 488,
    responseScore: 89,
    certifications: ['EU GMP', 'FDA'],
    leadTime: '24 days',
    volume: '90T yearly',
    logo: 'https://pharmaoffer.com/media/cache/rmcl/upload/logo/duchefa-farma-b-v.webp?version=20252209',
    facility:
      'https://pharmaoffer.com/media/cache/rmci/upload/picture/639ade03a2fae504874189.webp',
    tags: ['EU release', 'Audit ready'],
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
const selectionCompare = document.getElementById('selection-compare');
const transactionalDial = document.querySelector('[data-role="transactional-dial"]');
const siteSearchForm = document.querySelector('.site-header__search');

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

const initTransactionalDial = () => {
  if (!transactionalDial) return;

  const rawValue = Number(transactionalDial.dataset.value);
  const value = Number.isFinite(rawValue)
    ? Math.max(0, Math.min(100, Math.round(rawValue)))
    : 0;

  const sweep = (value / 100) * 270;
  const fillDegrees = `${sweep}deg`;
  const rotation = `${-135 + sweep}deg`;

  let activeColor = 'var(--brand-secondary)';
  let trackColor = 'rgba(60, 177, 195, 0.18)';

  if (value >= 80) {
    activeColor = 'var(--brand-secondary)';
    trackColor = 'rgba(60, 177, 195, 0.16)';
  } else if (value >= 55) {
    activeColor = 'var(--brand-primary)';
    trackColor = 'rgba(54, 103, 127, 0.16)';
  } else {
    activeColor = 'var(--brand-accent)';
    trackColor = 'rgba(239, 81, 125, 0.18)';
  }

  transactionalDial.style.setProperty('--dial-fill', fillDegrees);
  transactionalDial.style.setProperty('--dial-rotation', rotation);
  transactionalDial.style.setProperty('--dial-active', activeColor);
  transactionalDial.style.setProperty('--dial-track', trackColor);
  transactionalDial.dataset.value = String(value);
  transactionalDial.setAttribute(
    'aria-label',
    `Transactional health score ${value} out of 100`,
  );

  const valueLabel = transactionalDial.querySelector('.dial__value');
  if (valueLabel) {
    valueLabel.textContent = String(value);
  }

  const statusChip = transactionalDial.closest('.insight-card')?.querySelector('.chip');
  if (statusChip) {
    statusChip.classList.remove('chip--positive', 'chip--neutral', 'chip--warning');

    let nextClass = 'chip--neutral';
    let nextLabel = 'Stable';

    if (value >= 80) {
      nextClass = 'chip--positive';
      nextLabel = 'Improving';
    } else if (value < 55) {
      nextClass = 'chip--warning';
      nextLabel = 'Needs attention';
    }

    statusChip.classList.add(nextClass);
    statusChip.textContent = nextLabel;
  }
};

const formatCurrency = (value) => `$${value.toLocaleString()} / kg`;

const renderSupplierCard = (supplier) => {
  const card = template.content.firstElementChild.cloneNode(true);
  const checkbox = card.querySelector('.supplier-checkbox');
  const logoImage = card.querySelector('.supplier-card__logo');
  const badge = card.querySelector('.supplier-badge');
  const title = card.querySelector('h3');
  const subtitle = card.querySelector('.supplier-card__subtitle');
  const ratingEl = card.querySelector('.supplier-card__rating');
  const responseScoreEl = card.querySelector('.supplier-card__response-score');
  const responseTimeEl = card.querySelector('.supplier-card__response-time');
  const metaList = card.querySelector('.supplier-card__meta');
  const tagsContainer = card.querySelector('.supplier-card__tags');

  checkbox.dataset.id = supplier.id;
  checkbox.checked = state.selected.has(supplier.id);

  logoImage.src = supplier.logo;
  logoImage.alt = `${supplier.name} logo`;

  if (supplier.badge) {
    badge.textContent = supplier.badge;
    badge.className = 'supplier-badge';
    const modifier = supplier.badge.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    badge.classList.add(`supplier-badge--${modifier}`);
    badge.removeAttribute('hidden');
  } else {
    badge.setAttribute('hidden', '');
  }
  title.textContent = supplier.name;
  subtitle.textContent = supplier.subtitle;
  if (ratingEl) {
    ratingEl.innerHTML = `
      <span class="supplier-card__rating-star" aria-hidden="true">★</span>
      ${supplier.rating.toFixed(1)}
    `;
    ratingEl.setAttribute('aria-label', `${supplier.rating.toFixed(1)} out of 5`);
  }
  responseScoreEl.textContent = `${supplier.responseScore}%`;
  const responseUnit = supplier.response === 1 ? 'hour' : 'hours';
  responseTimeEl.textContent = `Avg. reply in ${supplier.response} ${responseUnit}`;

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

  if (clearSelectionBtn) {
    clearSelectionBtn.disabled = count === 0;
  }
  if (inquiryAction) {
    inquiryAction.disabled = count === 0;
  }
  if (selectionCompare) {
    selectionCompare.disabled = count === 0;
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
              <td>
                <div class="compare-supplier">
                  <img src="${supplier.logo}" alt="${supplier.name} logo" />
                  <span>${supplier.name}</span>
                </div>
              </td>
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

selectionCompare?.addEventListener('click', () => {
  if (!state.selected.size) return;
  openCompareModal();
});

siteSearchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
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

initTransactionalDial();
initRange();
renderSuppliers();
updateSelectionBar();
