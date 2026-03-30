import React, { useState, useRef } from 'react';
import { BasicPlaceAutocomplete, BasicPlaceAutocompleteRef, PlaceInfo } from './components';
import './App.css';

function App() {
  const example1Ref = useRef<BasicPlaceAutocompleteRef>(null);
  const [example1InputValue, setExample1InputValue] = useState<string>('');
  const [example1PendingPlace, setExample1PendingPlace] = useState<PlaceInfo | null>(null);
  const [example1SelectedPlace, setExample1SelectedPlace] = useState<PlaceInfo | null>(null);
  const [example2SelectedPlace, setExample2SelectedPlace] = useState<PlaceInfo | null>(null);

  const handleExample1InputChange = (value: string) => {
    setExample1InputValue(value);
    // Reset pending place when input changes
    if (value !== example1PendingPlace?.address) {
      setExample1PendingPlace(null);
    }
  };

  // Store the place when a suggestion is selected, but don't trigger the final selection yet
  const handleExample1SuggestionSelect = (place: PlaceInfo) => {
    console.log('Example 1 suggestion selected (pending):', place);
    setExample1PendingPlace(place);
    // Don't set example1SelectedPlace here - wait for button click
  };

  const handleExample1ButtonClick = () => {
    // Trigger the selection when button is clicked
    if (example1PendingPlace) {
      setExample1SelectedPlace(example1PendingPlace);
      console.log('Example 1 button clicked - place selected:', example1PendingPlace);
    } else {
      alert('Please select a place from the suggestions first');
    }
  };

  const handleExample2PlaceSelect = (place: PlaceInfo) => {
    console.log('Example 2 selected place:', place);
    setExample2SelectedPlace(place);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Google Maps Place Autocomplete</h1>
        <p className="app-subtitle">Using BasicPlaceAutocomplete Component</p>
      </div>

      <div className="app-content">
        {/* Example 1 */}
        <section className="demo-section">
          <h2 className="demo-section-title">Example 1: Trigger Selection with Button</h2>
          <p className="demo-section-description">Search for a place and click the button to trigger place selection</p>
          
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <BasicPlaceAutocomplete
                  ref={example1Ref}
                  placeholder="Type to search for an address..."
                  includedRegionCodes={['au']}
                  onInputChange={handleExample1InputChange}
                  onPlaceSelect={handleExample1SuggestionSelect}
                  updateValueOnSelect={true}
                  value={example1InputValue}
                />
              </div>
              <button
                onClick={handleExample1ButtonClick}
                disabled={!example1PendingPlace}
                style={{
                  padding: '12px 24px',
                  backgroundColor: example1PendingPlace ? '#3b82f6' : '#9ca3af',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: example1PendingPlace ? 'pointer' : 'not-allowed',
                  opacity: example1PendingPlace ? 1 : 0.6,
                  fontWeight: 500,
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                  height: '48px',
                }}
                onMouseOver={(e) => {
                  if (example1PendingPlace) {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = example1PendingPlace ? '#3b82f6' : '#9ca3af';
                }}
              >
                {example1PendingPlace ? 'Confirm Selection' : 'Select Place'}
              </button>
            </div>
          </div>

          {example1PendingPlace && !example1SelectedPlace && (
            <div className="place-result" style={{ opacity: 0.7, borderStyle: 'dashed' }}>
              <h3>Pending Selection (Example 1)</h3>
              <p><em>Click the button above to confirm this selection</em></p>
              <p><strong>Name:</strong> {example1PendingPlace.name}</p>
              <p><strong>Address:</strong> {example1PendingPlace.address}</p>
            </div>
          )}

          {example1SelectedPlace && (
            <div className="place-result">
              <h3>Selected Place (Example 1) - Confirmed!</h3>
              <p><strong>Name:</strong> {example1SelectedPlace.name}</p>
              <p><strong>Address:</strong> {example1SelectedPlace.address}</p>
              <p className="place-id"><strong>Place ID:</strong> {example1SelectedPlace.placeId}</p>
              {example1SelectedPlace.location && (
                <>
                  <p><strong>Latitude:</strong> {example1SelectedPlace.location.lat.toFixed(6)}</p>
                  <p><strong>Longitude:</strong> {example1SelectedPlace.location.lng.toFixed(6)}</p>
                </>
              )}
              {example1SelectedPlace.timezone && (
                <p><strong>Timezone:</strong> {example1SelectedPlace.timezone}</p>
              )}
            </div>
          )}
        </section>

        {/* Example 2 */}
        <section className="demo-section">
          <h2 className="demo-section-title">Example 2: Trigger Selection on Select</h2>
          <p className="demo-section-description">Click a suggestion to automatically trigger place selection</p>
          
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <BasicPlaceAutocomplete
              placeholder="Type to search for an address..."
              includedRegionCodes={['au']}
              onPlaceSelect={handleExample2PlaceSelect}
              updateValueOnSelect={true}
            />
          </div>

          {example2SelectedPlace && (
            <div className="place-result">
              <h3>Selected Place (Example 2)</h3>
              <p><strong>Name:</strong> {example2SelectedPlace.name}</p>
              <p><strong>Address:</strong> {example2SelectedPlace.address}</p>
              <p className="place-id"><strong>Place ID:</strong> {example2SelectedPlace.placeId}</p>
              {example2SelectedPlace.location && (
                <>
                  <p><strong>Latitude:</strong> {example2SelectedPlace.location.lat.toFixed(6)}</p>
                  <p><strong>Longitude:</strong> {example2SelectedPlace.location.lng.toFixed(6)}</p>
                </>
              )}
              {example2SelectedPlace.timezone && (
                <p><strong>Timezone:</strong> {example2SelectedPlace.timezone}</p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
