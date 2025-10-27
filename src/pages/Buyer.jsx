import { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import NavBar from '../components/NavBar';
import SelectField from '../components/SelectField';
import CurrencyField from '../components/CurrencyField';
import NumberField from '../components/NumberField';
import MonthYearPicker from '../components/MonthYearPicker';
import DataTable from '../components/DataTable';
import Alert from '../components/Alert';
import {
  getBuyerPostings,
  createBuyerPosting,
  updateBuyerPosting,
  deleteBuyerPosting,
} from '../services/api';
import { mockBuyerPostings } from '../services/mockData';

const Buyer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [usesMock, setUsesMock] = useState(false);

  // Form state
  const [cropName, setCropName] = useState('');
  const [priceOffer, setPriceOffer] = useState('');
  const [priceUnit, setPriceUnit] = useState('per_kg');
  const [quantity, setQuantity] = useState('');
  const [quantityUnit, setQuantityUnit] = useState('kg');
  const [purchaseWindow, setPurchaseWindow] = useState({ month: null, year: null });
  const [location, setLocation] = useState('');

  // Listings state
  const [postings, setPostings] = useState([]);

  const cropOptions = [
    { value: 'Paddy', label: 'Paddy' },
    { value: 'Wheat', label: 'Wheat' },
    { value: 'Cotton', label: 'Cotton' },
    { value: 'Sugarcane', label: 'Sugarcane' },
    { value: 'Maize', label: 'Maize' },
    { value: 'Pulses', label: 'Pulses' },
  ];

  useEffect(() => {
    loadPostings();
  }, []);

  const loadPostings = async () => {
    try {
      const data = await getBuyerPostings();
      setPostings(data);
      setUsesMock(false);
    } catch (err) {
      console.warn('Failed to load postings, using mock:', err);
      setPostings(mockBuyerPostings);
      setUsesMock(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const posting = {
        cropName,
        priceOffer: parseFloat(priceOffer),
        priceUnit,
        quantity: parseFloat(quantity),
        quantityUnit,
        purchaseWindow,
        location: location || null,
        postedOn: new Date().toISOString().split('T')[0],
      };

      if (usesMock) {
        // Mock creation
        const newPosting = { ...posting, id: postings.length + 1 };
        setPostings([...postings, newPosting]);
        setSuccess('Requirement posted successfully (mock mode)');
      } else {
        await createBuyerPosting(posting);
        await loadPostings();
        setSuccess('Requirement posted successfully');
      }

      // Reset form
      setCropName('');
      setPriceOffer('');
      setQuantity('');
      setLocation('');
      setPurchaseWindow({ month: null, year: null });
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to post requirement');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row) => {
    if (!confirm('Are you sure you want to delete this posting?')) return;

    try {
      if (usesMock) {
        setPostings(postings.filter(p => p.id !== row.id));
        setSuccess('Posting deleted (mock mode)');
      } else {
        await deleteBuyerPosting(row.id);
        await loadPostings();
        setSuccess('Posting deleted successfully');
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to delete posting');
    }
  };

  const columns = [
    { key: 'cropName', label: 'Crop', sortable: true },
    {
      key: 'priceOffer',
      label: 'Price',
      sortable: true,
      render: (val, row) => `₹${val}/${row.priceUnit === 'per_kg' ? 'kg' : 'ton'}`,
    },
    {
      key: 'quantity',
      label: 'Quantity',
      sortable: true,
      render: (val, row) => `${val} ${row.quantityUnit}`,
    },
    {
      key: 'purchaseWindow',
      label: 'Window',
      render: (val) => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${monthNames[val.month - 1]} ${val.year}`;
      },
    },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'postedOn', label: 'Posted On', sortable: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Buyer Portal</h1>
            <p className="text-muted-foreground">
              Post your crop requirements and browse available offers
            </p>
          </div>

          {error && <Alert type="error" message={error} onClose={() => setError('')} />}
          {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}
          {usesMock && (
            <Alert
              type="info"
              message="Using mock data because backend is offline. Changes are local only."
            />
          )}

          {/* Post Requirement Form */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Post New Requirement
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <SelectField
                  label="Crop Name"
                  value={cropName}
                  onChange={setCropName}
                  options={cropOptions}
                  placeholder="Select crop"
                  required
                />

                <CurrencyField
                  label="Price Offer"
                  value={priceOffer}
                  onChange={setPriceOffer}
                  onUnitChange={setPriceUnit}
                  required
                />

                <NumberField
                  label="Quantity"
                  value={quantity}
                  onChange={setQuantity}
                  min="1"
                  placeholder="Enter quantity"
                  required
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Quantity Unit
                  </label>
                  <div className="flex border border-input rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantityUnit('kg')}
                      className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                        quantityUnit === 'kg'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background text-foreground hover:bg-muted'
                      }`}
                    >
                      kg
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuantityUnit('ton')}
                      className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors border-l border-input ${
                        quantityUnit === 'ton'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background text-foreground hover:bg-muted'
                      }`}
                    >
                      ton
                    </button>
                  </div>
                </div>

                <MonthYearPicker
                  label="Purchase Window"
                  value={purchaseWindow}
                  onChange={setPurchaseWindow}
                  required
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                    className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      Post Requirement
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCropName('');
                    setPriceOffer('');
                    setQuantity('');
                    setLocation('');
                    setPurchaseWindow({ month: null, year: null });
                  }}
                  className="px-6 py-3 rounded-lg font-semibold border-2 border-border text-foreground hover:bg-muted transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Buyer Requirements List */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">All Buyer Requirements</h2>
            <DataTable
              columns={columns}
              data={postings}
              onDelete={handleDelete}
              searchable
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Buyer;
