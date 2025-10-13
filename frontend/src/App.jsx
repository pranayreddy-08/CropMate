import React, { useState } from 'react'
import axios from 'axios'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const Input = ({label, value, set, step=0.1}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">{label}</label>
    <input
      type="number"
      step={step}
      value={value}
      onChange={e => set(parseFloat(e.target.value))}
      className="border rounded-md px-3 py-2"
    />
  </div>
)

export default function App() {
  const [N, setN] = useState(60)
  const [P, setP] = useState(40)
  const [K, setK] = useState(50)
  const [temperature, setTemperature] = useState(26)
  const [humidity, setHumidity] = useState(65)
  const [ph, setPh] = useState(6.8)
  const [rainfall, setRainfall] = useState(180)
  const [resp, setResp] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post(`${API}/predict`, {
        features: { N, P, K, temperature, humidity, ph, rainfall }
      })
      setResp(data)
    } catch (e) {
      alert('Prediction failed. Is the FastAPI backend running on 8000?')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setN(60); setP(40); setK(50); setTemperature(26); setHumidity(65); setPh(6.8); setRainfall(180); setResp(null)
  }

  const chartData = [
    { name:'N', value:N }, { name:'P', value:P }, { name:'K', value:K },
    { name:'Temp', value:temperature }, { name:'Hum', value:humidity },
    { name:'pH', value:ph }, { name:'Rain', value:rainfall },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-emerald-700">CropMate — AI Crop Recommendation</h1>
        <span className="text-xs text-gray-500">API: {API}</span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Enter Soil & Climate Parameters</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nitrogen (N)" value={N} set={setN} />
            <Input label="Phosphorus (P)" value={P} set={setP} />
            <Input label="Potassium (K)" value={K} set={setK} />
            <Input label="Temperature (°C)" value={temperature} set={setTemperature} />
            <Input label="Humidity (%)" value={humidity} set={setHumidity} />
            <Input label="pH" value={ph} step={0.01} set={setPh} />
            <Input label="Rainfall (mm)" value={rainfall} set={setRainfall} />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={submit} disabled={loading} className="bg-emerald-600 text-white px-4 py-2 rounded-md">
              {loading ? 'Predicting...' : 'Predict Crop'}
            </button>
            <button onClick={reset} className="px-4 py-2 rounded-md border">Try Again</button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Soil Health Snapshot</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {resp && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow col-span-1">
            <h3 className="font-semibold mb-2">Recommended Crop</h3>
            <p className="text-3xl font-bold">{resp.crop}</p>
            <p className="text-gray-500">Confidence: {(resp.confidence * 100).toFixed(1)}%</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Sustainability Scores</h3>
            <ul className="text-sm leading-7">
              <li>Water efficiency: <b>{resp.sustainability.water_efficiency}</b></li>
              <li>Fertilizer need score: <b>{resp.sustainability.fertilizer_need_score}</b></li>
              <li>Carbon impact score: <b>{resp.sustainability.carbon_impact_score}</b></li>
            </ul>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-2">AI Advisor (optional)</h3>
            <p className="text-sm text-gray-600">Hook this to OpenAI/Gemini later to explain recommendations.</p>
          </div>
        </div>
      )}
    </div>
  )
}
