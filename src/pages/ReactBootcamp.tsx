import { useMemo } from 'react';
import { Button } from '../components/ui/Button';
import { bootcamps } from '../data/bootcamps';
import { Disclosure } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

const ReactBootcamp = () => {
  const reactBootcamp = useMemo(() => bootcamps.find(b => b.id === 'react'), []);

  return (
    <div className="flex-1">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            React JS Bootcamp
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {reactBootcamp?.description}
          </p>
          <p className="text-2xl font-bold mb-8">
            {reactBootcamp?.duration} • Job & Interview Ready
          </p>
          <Button size="lg" className="text-lg px-8 mx-auto">
            Enroll Now
          </Button>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Interactive Lessons
          </h2>
          <div className="space-y-4">
            {reactBootcamp?.lessons.map((lesson) => (
              <Disclosure key={lesson.id} as="div" className="w-full">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100/50 px-4 py-4 text-left text-sm font-medium text-blue-800 hover:bg-blue-200/50 focus:outline-none focus-visible:ring focus-visible:ring-blue/75">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          lesson.level === 'beginner' ? 'bg-green-200 text-green-800' :
                          lesson.level === 'intermediate' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-red-200 text-red-800'
                        }`}>
                          {lesson.level?.toUpperCase()}
                        </span>
                        <span>{lesson.title}</span>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-700">
                      <p className="mb-4">{lesson.description}</p>
                      <ul className="list-disc list-inside space-y-1 mb-6">
                        {lesson.topics.map((topic, i) => (
                          <li key={i}>{topic}</li>
                        ))}
                      </ul>
                      {lesson.resources && (
                        <div className="flex gap-2">
                          {lesson.resources.map((res, i) => (
                            <a key={i} href={res} className="text-blue-600 hover:underline">
                              Resource {i+1}
                            </a>
                          ))}
                        </div>
                      )}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReactBootcamp;

