import { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import NavBar from "../components/NavBar";
import SelectField from "../components/SelectField";
import CurrencyField from "../components/CurrencyField";
import NumberField from "../components/NumberField";
import MonthYearPicker from "../components/MonthYearPicker";
import DataTable from "../components/DataTable";
import Alert from "../components/Alert";
import {
  getBuyerPostings,
  createBuyerPosting,
  deleteBuyerPosting,
} from "../services/api";
import { mockBuyerPostings } from "../services/mockData";

function Buyer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [usesMock, setUsesMock] = useState(false);

  // Form state
  const [cropName, setCropName] = useState("");
  const [priceOffer, setPriceOffer] = useState("");
  const [priceUnit, setPriceUnit] = useState("per_kg");
  const [quantity, setQuantity] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("kg");
  const [purchaseWindow, setPurchaseWindow] = useState({ month: null, year: null });
  const [location, setLocation] = useState("");

  const [postings, setPostings] = useState([]);

  const cropOptions = [
    { value: "Paddy", label: "Paddy" },
    { value: "Wheat", label: "Wheat" },
    { value: "Cotton", label: "Cotton" },
    { value: "Sugarcane", label: "Sugarcane" },
    { value: "Maize", label: "Maize" },
    { value: "Pulses", label: "Pulses" },
  ];

  useEffect(() => {
    loadPostings();
  }, []);

  const loadPostings = async () => {
    try {
      const data = await getBuyerPostings();
      setPostings(data);
      setUsesMock(false);
    } catch {
      setPostings(mockBuyerPostings);
      setUsesMock(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const posting = {
        cropName,
        priceOffer: parseFloat(priceOffer),
        priceUnit,
        quantity: parseFloat(quantity),
        quantityUnit,
        purchaseWindow,
        location: location || null,
        postedOn: new Date().toISOString().split("T")[0],
      };

      if (usesMock) {
        const newPosting = { ...posting, id: postings.length + 1 };
        setPostings([...postings, newPosting]);
        setSuccess("Requirement posted successfully (mock mode)");
      } else {
        await createBuyerPosting(posting);
        await loadPostings();
        setSuccess("Requirement posted successfully");
      }

      // reset
      setCropName("");
      setPriceOffer("");
      setQuantity("");
      setLocation("");
      setPurchaseWindow({ month: null, year: null });
    } catch (err) {
      setError(err?.response?.data?.detail || err?.message || "Failed to post requirement");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row) => {
    if (!confirm("Delete this posting?")) return;
    try {
      if (usesMock) {
        setPostings(postings.filter((p) => p.id !== row.id));
        setSuccess("Posting deleted");
      } else {
        await deleteBuyerPosting(row.id);
        await loadPostings();
        setSuccess("Posting deleted successfully");
      }
    } catch (err) {
      setError(err?.response?.data?.detail || err?.message || "Failed to delete posting");
    }
  };

  const columns = [
    { key: "cropName", label: "Crop", sortable: true },
    {
      key: "priceOffer",
      label: "Price",
      sortable: true,
      render: (val, row) => `₹${val}/${row.priceUnit === "per_kg" ? "kg" : "ton"}`,
    },
    {
      key: "quantity",
      label: "Quantity",
      sortable: true,
      render: (val, row) => `${val} ${row.quantityUnit}`,
    },
    {
      key: "purchaseWindow",
      label: "Window",
      render: (val) => {
        const m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return `${m[val.month - 1]} ${val.year}`;
      },
    },
    { key: "location", label: "Location", sortable: true },
    { key: "postedOn", label: "Posted On", sortable: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="container mx-auto px-3 sm:px-4 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Buyer Portal
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Post your crop requirements and browse available offers.
            </p>
          </div>


          {/* Form */}
          <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              Post New Requirement
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

                {/* Quantity Unit Toggle */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Quantity Unit</label>
                  <div className="flex border border-input rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantityUnit("kg")}
                      className={`flex-1 px-4 py-2 text-sm sm:text-base font-medium transition-colors ${
                        quantityUnit === "kg"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      kg
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuantityUnit("ton")}
                      className={`flex-1 px-4 py-2 text-sm sm:text-base font-medium transition-colors border-l border-input ${
                        quantityUnit === "ton"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-foreground hover:bg-muted"
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
                  <label className="block text-sm font-medium text-foreground">Location (Optional)</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                    className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Buttons: full-width on mobile, inline on md+ */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-primary text-primary-foreground px-5 sm:px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
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
                    setCropName("");
                    setPriceOffer("");
                    setQuantity("");
                    setLocation("");
                    setPurchaseWindow({ month: null, year: null });
                  }}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-lg font-semibold border-2 border-border text-foreground hover:bg-muted transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Table: horizontal scroll on small screens */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
              All Buyer Requirements
            </h2>

            <div className="-mx-3 sm:mx-0 overflow-x-auto">
              <div className="min-w-[640px] sm:min-w-0">
                <DataTable
                  columns={columns}
                  data={postings}
                  onDelete={handleDelete}
                  searchable
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Buyer;
