import React, { useState } from 'react';

const PropertySearch = () => {
const [activeTab, setActiveTab] = useState('for-sale');
const [activePropertyType, setActivePropertyType] = useState('residential');
const [location, setLocation] = useState('');
const [category, setCategory] = useState('');

// Handle tab change and manage active state
  const handleTabClick = (tab: string) => {
if (activeTab !== tab) {
setActiveTab(tab);
}
};

// Handle property type selection
const handlePropertyTypeClick = (type:string) => {
setActivePropertyType(type);
};

// Handle location input change
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setLocation(e.target.value);
};

// Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
console.log('Form Submitted:', { activeTab, activePropertyType, location, category });
};

return (
<div className="property-search property-search-mini">
  <div className="search-tab-div">
    <ul className="like-tab">
      <li className="only-small-screen">
        <a
          href="#"
          data-id="for-sale"
          onClick={()=> handleTabClick('for-sale')}
          className={activeTab === 'for-sale' ? 'active active-tab' : ''}
          >
          Buy
        </a>
      </li>
      <li className="only-small-screen">
        <a
            href="#"
          data-id="for-rent"
          onClick={()=> handleTabClick('for-rent')}
          className={activeTab === 'for-rent' ? 'active active-tab' : ''}
          >
          Rent
        </a>
      </li>
      <li className="no-small-screen">
        <a
          href="#"
          data-id="residential"
          onClick={()=> handlePropertyTypeClick('residential')}
          className={activePropertyType === 'residential' ? 'active active-tab' : ''}
          >
          Residential
        </a>
      </li>
      <li className="no-small-screen">
        <a
          href="#"
          data-id="commercial"
          onClick={()=> handlePropertyTypeClick('commercial')}
          className={activePropertyType === 'commercial' ? 'active active-tab' : ''}
          >
          Commercial
        </a>
      </li>
      <li>
        <a href="/off-plan">Off-Plan</a>
      </li>
    </ul>
  </div>

  <form className="property-search-form" id="frmId" onSubmit={handleSubmit}>
    <div className="row row-bg-1" style={{ background: '#fff', display: 'flex' }}>
      <div className="col-sm-2 sect-home" style={{ minWidth: '128px' }}>
        <select
          name="sect"
          style={{ width: '100%' }}
          className="form-control"
          value={activeTab}
          onChange={(e)=> handleTabClick(e.target.value)}
          >
          <option value="for-sale">Buy</option>
          <option value="for-rent">Rent</option>
        </select>
      </div>

      <div className="col-sm-4 drop-module border-l-1">
        <div>
          <div className="heading" onClick={()=> setActivePropertyType(activePropertyType === 'residential' ? 'commercial' : 'residential')}>
            <span>Property Type</span>
            <div className="drop">
              <ul className="main-listtype">
                <li>
                  <a
                    href="#"
                    className={activePropertyType==='residential' ? 'active' : '' }
                    onClick={()=> handlePropertyTypeClick('residential')}
                    >
                    Residential
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={activePropertyType==='commercial' ? 'active' : '' }
                    onClick={()=> handlePropertyTypeClick('commercial')}
                    >
                    Commercial
                  </a>
                </li>
              </ul>

              <ul className="tab-container-1">
                <li className={activePropertyType==='residential' ? 'drop-cls active' : 'drop-cls' }>
                  <div className="drop2">
                    <ul>
                      {/* Replace with dynamic categories */}
                      <li
                        className={category==='residential' ? 'active' : '' }
                        onClick={()=> setCategory('residential')}
                        >
                        Residential Category 1
                      </li>
                      <li
                        className={category==='residential' ? 'active' : '' }
                        onClick={()=> setCategory('residential')}
                        >
                        Residential Category 2
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={activePropertyType==='commercial' ? 'drop-cls active' : 'drop-cls' }>
                  <div className="drop2">
                    <ul>
                      {/* Replace with dynamic categories */}
                      <li
                        className={category==='commercial' ? 'active' : '' }
                        onClick={()=> setCategory('commercial')}
                        >
                        Commercial Category 1
                      </li>
                      <li
                        className={category==='commercial' ? 'active' : '' }
                        onClick={()=> setCategory('commercial')}
                        >
                        Commercial Category 2
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="col col-sm-4 col-md-5 form-group property-search-location clearfix site">
        <label>Enter Location</label>
        <div className="typeahead__container">
          <div className="typeahead__field">
            <div className="typeahead__query">
              <input
                className="js-typeahead-hockey_v2"
                placeholder="Search by Community or Building"
                autoComplete="off"
                value={location}
                onChange={handleLocationChange} />
            </div>
            <div className="typeahead__button">
              <button type="submit" className="btn btn-default">
                <i className="bi bi-arrow-right only-small-screen"></i>Search <span>Properties</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>
);
};

export default PropertySearch;