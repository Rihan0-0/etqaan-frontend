import Header from "@/components/Header";
import BackgroundPattern from "@/components/BackgroundPattern";
import InstructorOverview from "@/components/instructor/InstructorOverview";
import UpcomingLectures from "@/components/instructor/UpcomingLectures";
import StudentFeedback from "@/components/instructor/StudentFeedback";
import StudentsManagement from "@/components/instructor/StudentsManagement";
import QuickStats from "@/components/instructor/QuickStats";

export default function InstructorDashboard({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 min-h-screen relative">
      <BackgroundPattern />

      <div className="relative z-10">
        <Header />

        <main className="p-6 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <InstructorOverview instructorId={params.id} />

          {/* Quick Stats */}
          <QuickStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Left Column - Lectures & Feedback */}
            <div className="lg:col-span-2 space-y-8">
              <UpcomingLectures />
              <StudentFeedback />
            </div>

            {/* Right Column - Students Management */}
            <div className="lg:col-span-1">
              <StudentsManagement />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
