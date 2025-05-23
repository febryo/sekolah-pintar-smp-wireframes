
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SchoolEventsPage from "./pages/SchoolEventsPage";
import MasterTeacherPage from "./pages/MasterTeacherPage";
import MasterSubjectPage from "./pages/MasterSubjectPage";
import TeacherSubjectMappingPage from "./pages/TeacherSubjectMappingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<SchoolEventsPage />} />
          <Route path="/master-teacher" element={<MasterTeacherPage />} />
          <Route path="/master-subject" element={<MasterSubjectPage />} />
          <Route path="/teacher-subject-mapping" element={<TeacherSubjectMappingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
