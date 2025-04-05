import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { Navbar } from './(auth)/components/navbar';

const LandingPage: FC = () => {
  return (
    <>
     <Navbar />
    <div className="min-h-screen bg-slate-100 text-gray-800">
      <div className="relative z-10 container mx-auto px-4 py-32 text-center ">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-scout-pine to-scout-moss">
          Welcome to the Scouts Achievements Game</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Earn points as you complete different achievements and level up!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/achievements">
              Explore Achievements
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
          >
            <Link href="/profile">View Your Progress</Link>
          </Button>
        </div>
      </div>



      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Achievements & Points</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <div className="border p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-medium text-blue-500">Scout Badge</h3>
            <p className="mt-2 text-gray-700">Complete your first scouting activity to earn this badge.</p>
            <p className="mt-2 text-sm text-gray-500">Points: 50</p>
          </div>
          <div className="border p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-medium text-blue-500">Team Player</h3>
            <p className="mt-2 text-gray-700">Work with your team to complete a group challenge.</p>
            <p className="mt-2 text-sm text-gray-500">Points: 100</p>
          </div>
          <div className="border p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-medium text-blue-500">Leader</h3>
            <p className="mt-2 text-gray-700">Lead your group to victory in a scouting event.</p>
            <p className="mt-2 text-sm text-gray-500">Points: 200</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Join the Game</h2>
        <p className="mt-4 text-lg text-gray-700">Sign up to start earning points and climbing the leaderboard.</p>
        <Button className="mt-6 px-8 py-3 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Sign Up Now
        </Button>
      </section>

      <footer className="py-8 text-center bg-gray-800 text-white">
        <p>2025 Scouts Achievements Game</p>
      </footer>
    </div>
    </>
  );
};

export default LandingPage;
