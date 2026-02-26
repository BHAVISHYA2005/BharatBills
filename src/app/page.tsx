export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            BharatBills
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Simple GST Invoicing Software for Indian Businesses
          </p>
          <p className="text-gray-500 mb-8">
            Create professional invoices with automatic GST calculations
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/auth/signup"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </a>
            <a
              href="/auth/login"
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Sign In
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">📝 Invoicing</h3>
            <p className="text-gray-600">
              Create professional invoices with automatic sequential numbering
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">🧮 GST Ready</h3>
            <p className="text-gray-600">
              Real-time GST calculations with CGST, SGST, and IGST support
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">📊 Reporting</h3>
            <p className="text-gray-600">
              Track your sales and GST liability with built-in reports
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white p-12 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to simplify your invoicing?
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Start creating GST-compliant invoices in minutes, not hours.
          </p>
          <a
            href="/auth/signup"
            className="px-10 py-4 bg-blue-600 text-white text-lg rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
          >
            Create Free Account
          </a>
        </div>
      </div>
    </div>
  );
}
