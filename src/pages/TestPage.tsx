import TestTailwind from '../components/TestTailwind';

import SEO from '../components/SEO';

export default function TestPage() {
  return (
    <>
      <SEO 
        title="Test Page"
        description="Test page for Rudrakshya Barman's website."
        keywords="test, website, development"
      />
      <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Tailwind CSS Test Page</h1>
      <TestTailwind />
    </div>
    </>
  );
}