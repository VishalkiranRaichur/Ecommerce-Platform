import WhatsAppButton from '@/components/WhatsAppButton'
import InstagramButton from '@/components/InstagramButton'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            About Sujatha Boutique
          </h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-6 text-gray-700 leading-relaxed mb-12">
            <p>
              Welcome to Sujatha Boutique, where elegance meets tradition. We are passionate about creating beautiful, high-quality women's fashion that celebrates Indian craftsmanship and contemporary design.
            </p>
            <p>
              Our boutique specializes in designer blouses, festive wear, and bridal ensembles. Each piece in our collection is carefully curated to ensure premium quality, timeless elegance, and exceptional craftsmanship.
            </p>
            <p>
              Founded with a vision to make elegant fashion accessible, Sujatha Boutique brings together traditional Indian artistry and modern design sensibilities. We work with skilled artisans and use only the finest fabrics to create pieces that you'll treasure for years to come.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
              Why Trust Us
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Premium Quality
                </h3>
                <p className="text-gray-700">
                  We source the finest fabrics and materials, ensuring every garment meets our stringent quality standards. Our attention to detail and commitment to excellence is evident in every stitch.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Handpicked Collections
                </h3>
                <p className="text-gray-700">
                  Each product in our catalog is carefully selected to ensure it meets our criteria for style, quality, and craftsmanship. We believe in offering a curated collection rather than overwhelming choices.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Customer-Centric Approach
                </h3>
                <p className="text-gray-700">
                  Your satisfaction is our priority. We're here to help you find the perfect piece for any occasion. Whether it's a casual blouse for daily wear or an exquisite bridal ensemble, we're committed to making your shopping experience delightful.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Transparent Communication
                </h3>
                <p className="text-gray-700">
                  We believe in honest communication and clear information about our products. Every detail you see on our website is accurate, and we're always available to answer any questions you may have.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-6">
              Have questions? Want to place a custom order? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton phoneNumber="+917795855292" message="Hello! I have a question about your products." />
              <InstagramButton username="sujatha.m798" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
