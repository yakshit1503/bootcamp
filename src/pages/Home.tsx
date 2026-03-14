import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { bootcamps } from '../data/bootcamps';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Frontend Bootcamp
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Job-ready React & JavaScript skills for interviews. Responsive, production-ready training.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/react">
              <Button size="lg" variant="default" className="text-lg px-8">
                Start React Bootcamp
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-gray-900">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Bootcamps */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Choose Your Bootcamp
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Interactive lessons, real-world projects, interview prep.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {bootcamps.map((bootcamp) => (
              <Link key={bootcamp.id} to={`/${bootcamp.id}`} className="group">
                <Card className="h-full overflow-hidden group-hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02]">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                      <span className="text-white font-bold text-lg">R</span>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {bootcamp.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg mb-6">
                      {bootcamp.description}
                    </CardDescription>
                    <div className="space-y-2 mb-6">
                      <p className="flex items-center text-sm text-gray-500">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {bootcamp.duration} full course
                      </p>
                      <p className="flex items-center text-sm text-gray-500">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        50+ interactive lessons
                      </p>
                    </div>
                    <Button className="w-full group-hover:bg-primary transition-colors">
                      Explore Bootcamp →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

