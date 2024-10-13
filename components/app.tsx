"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { UserIcon, Stethoscope, BookOpen, ArrowRight, Calendar, MessageSquare, FileText, Video, Users, BarChart, Search, ChevronRight, CheckCircle2 } from 'lucide-react'

// Glassmorphism Card Component with Animated Border
const GlassCard = ({ children, className = '', animate = false }) => (
  <div className={`relative backdrop-blur-lg bg-gray-900/70 rounded-xl shadow-lg overflow-hidden ${className}`}>
    {animate && (
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 animate-pulse" style={{ mixBlendMode: 'overlay' }}></div>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-moveLeftRight"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-moveRightLeft"></div>
        <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-moveTopBottom"></div>
        <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-moveBottomTop"></div>
      </div>
    )}
    <div className="relative z-10">{children}</div>
  </div>
)

// Login Dialog Component
function LoginDialog({ onLogin, buttonText }) {
  const [isOpen, setIsOpen] = useState(false)
  const [role, setRole] = useState('patient')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    onLogin(role, username, password)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 group"
        >
          {buttonText}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Login to RareCare</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="col-span-4 bg-gray-700 text-white">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-white">
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="researcher">Researcher</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-4 bg-gray-700 text-white"
              placeholder="Username"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-4 bg-gray-700 text-white"
              placeholder="Password"
            />
          </div>
        </div>
        <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700">Login</Button>
      </DialogContent>
    </Dialog>
  )
}

// Landing Page Component
function LandingPage({ onLogin }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <header className="bg-transparent py-6">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img className="h-12 w-auto" src="https://ik.imagekit.io/lsqgqcqgy/logo.svg" alt="RareCare" />
              <span className="ml-2 text-2xl font-bold text-white">RareCare</span>
            </div>
            <div className="flex items-center space-x-4">
              <LoginDialog onLogin={onLogin} buttonText="Login" />
              <LoginDialog onLogin={onLogin} buttonText="Sign Up" />
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            Revolutionizing <span className="text-blue-400">Rare Disease Care</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Connect with specialists, contribute to research, and take control of your rare disease journey - all in one platform.
          </p>
          <LoginDialog onLogin={onLogin} buttonText="Get Started" />
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'For Patients',
                description: 'Submit cases, connect with specialists, and manage your rare disease journey.',
                icon: UserIcon,
              },
              {
                name: 'For Doctors',
                description: 'Collaborate on rare cases, access specialized resources, and expand your expertise.',
                icon: Stethoscope,
              },
              {
                name: 'For Researchers',
                description: 'Access anonymized rare disease data, collaborate on studies, and advance medical knowledge.',
                icon: BookOpen,
              },
            ].map((feature) => (
              <GlassCard key={feature.name} className="p-6 hover:bg-gray-800/60 transition-colors duration-300">
                <div className="flex flex-col items-center text-white">
                  <feature.icon className="h-12 w-12 mb-4 text-blue-400" />
                  <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                  <p className="text-center text-gray-300">{feature.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

// Patient Portal Component
function PatientPortal({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const demoAppointments = [
    { id: 1, doctor: "Dr. Smith", specialty: "Rare Genetic Disorders", date: "June 15, 2023", time: "10:00 AM" },
    { id: 2, doctor: "Dr. Johnson", specialty: "Rare Autoimmune Diseases", date: "June 18, 2023", time: "2:00 PM" },
    { id: 3, doctor: "Dr. Williams", specialty: "Rare Neurological Conditions", date: "June 20, 2023", time: "11:30 AM" },
  ]

  const demoDoctors = [
    { id: 1, name: "Dr. Emily Chen", specialty: "Rare Genetic Disorders", rating: 4.9 },
    { id: 2, name: "Dr. Michael Lee", specialty: "Rare Metabolic Diseases", rating: 4.7 },
    { id: 3, name: "Dr. Sarah Johnson", specialty: "Rare Pediatric Conditions", rating: 4.8 },
    { id: 4, name: "Dr. David Brown", specialty: "Rare Neurological Disorders", rating: 4.6 },
    { id: 5, name: "Dr. Lisa Taylor", specialty: "Rare Autoimmune Diseases", rating: 4.9 },
  ]

  const filteredDoctors = demoDoctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <header className="bg-gray-800/50 backdrop-blur-lg shadow-lg rounded-xl mb-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Patient Portal</h1>
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10 ring-2 ring-blue-400">
              <AvatarImage src="https://ik.imagekit.io/lsqgqcqgy/avatar_JD.png" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-sm text-white">John Doe</span>
            <Button onClick={onLogout} variant="secondary">Logout</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <GlassCard className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-gray-700/50 p-1 rounded-lg">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Dashboard</TabsTrigger>
              <TabsTrigger value="submit-case" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Submit Case</TabsTrigger>
              <TabsTrigger value="doctors" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Find Doctors</TabsTrigger>
              <TabsTrigger value="appointments" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Appointments</TabsTrigger>
              <TabsTrigger value="messages" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <GlassCard className="p-6" animate={true}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Welcome back, John!</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <GlassCard className="p-4" animate={true}>
                      <h3 className="text-lg font-semibold text-white mb-2">Upcoming Appointment</h3>
                      <p className="text-gray-300">Dr. Smith - Rare Genetic Disorders</p>
                      <p className="text-gray-300">June 15, 2023 at 10:00 AM</p>
                    </GlassCard>
                    <GlassCard className="p-4" animate={true}>
                      <h3 className="text-lg font-semibold text-white mb-2">Recent Messages</h3>
                      <p className="text-gray-300">You have 2 unread messages</p>
                    </GlassCard>
                  </div>
                </CardContent>
              </GlassCard>
            </TabsContent>

            <TabsContent value="submit-case">
              <GlassCard className="p-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Submit a New Case</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="symptoms" className="block text-sm font-medium text-gray-300">
                        Describe your symptoms
                      </label>
                      <Textarea id="symptoms" className="mt-1 bg-gray-700/50 backdrop-blur-md text-white placeholder-gray-400" />
                    </div>
                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-300">
                        Duration of symptoms
                      </label>
                      <Input type="text" id="duration" className="mt-1 bg-gray-700/50 backdrop-blur-md text-white placeholder-gray-400" />
                    </div>
                    <div>
                      <label htmlFor="severity" className="block text-sm font-medium text-gray-300">

                        Severity
                      </label>
                      <Select>
                        <SelectTrigger id="severity" className="mt-1 bg-gray-700/50 backdrop-blur-md text-white">
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mild">Mild</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="severe">Severe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="submit"
                      className={`bg-blue-600 text-white hover:bg-blue-700 ${isSubmitting ? 'animate-pulse' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Case'}
                      {isSubmitting && <span className="ml-2 animate-spin">⭐</span>}
                    </Button>
                  </form>
                  {isSubmitting && (
                    <div className="mt-4 text-green-400 animate-fadeIn">
                      <CheckCircle2 className="inline-block mr-2" /> Case submitted successfully!
                    </div>
                  )}
                </CardContent>
              </GlassCard>
            </TabsContent>

            <TabsContent value="doctors">
              <GlassCard className="p-6" animate={true}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white mb-4">Find Doctors</CardTitle>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search by name or specialty"
                      className="pl-10 bg-gray-700/50 backdrop-blur-md text-white placeholder-gray-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredDoctors.map((doctor) => (
                      <GlassCard key={doctor.id} className="p-4 hover:bg-gray-800/60 transition-colors duration-300" animate={true}>
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`https://ik.imagekit.io/lsqgqcqgy/doctor_${doctor.id}.png`} alt={doctor.name} />
                            <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{doctor.name}</h3>
                            <p className="text-sm text-gray-300">{doctor.specialty}</p>
                            <p className="text-sm text-blue-400">Rating: {doctor.rating}/5</p>
                          </div>
                          <Button className="ml-auto bg-blue-600 text-white hover:bg-blue-700">Select</Button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>
            </TabsContent>

            <TabsContent value="appointments">
              <GlassCard className="p-6" animate={true}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Your Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {demoAppointments.map((appointment) => (
                      <GlassCard key={appointment.id} className="p-4 hover:bg-gray-800/60 transition-colors duration-300" animate={true}>
                        <div className="flex items-center space-x-4">
                          <Calendar className="h-6 w-6 text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-white">{appointment.doctor}</h3>
                            <p className="text-sm text-gray-300">{appointment.specialty}</p>
                            <p className="text-sm text-gray-300">{appointment.date} at {appointment.time}</p>
                          </div>
                          <Button variant="outline" className="ml-auto text-white border-white hover:bg-blue-600 hover:text-white">Reschedule</Button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>
            </TabsContent>

            <TabsContent value="messages">
              <GlassCard className="p-6" animate={true}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((message) => (
                      <GlassCard key={message} className="p-4 hover:bg-gray-800/60 transition-colors duration-300" animate={true}>
                        <div className="flex items-center space-x-4">
                          <MessageSquare className="h-6 w-6 text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-white">Dr. Johnson {message}</h3>
                            <p className="text-sm text-gray-300">Re: Your recent appointment</p>
                          </div>
                          <Button variant="outline" className="ml-auto text-white border-white hover:bg-blue-600 hover:text-white">Read</Button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </GlassCard>
      </main>
    </div>
  )
}

// Doctor Portal Component
function DoctorPortal({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')

  const demoPatients = [
    { id: 1, name: "John Doe", lastVisit: "May 15, 2023", condition: "Rare Genetic Disorder" },
    { id: 2, name: "Jane Smith", lastVisit: "May 20, 2023", condition: "Rare Autoimmune Disease" },
    { id: 3, name: "Mike Johnson", lastVisit: "May 25, 2023", condition: "Rare Metabolic Disorder" },
    { id: 4, name: "Emily Brown", lastVisit: "June 1, 2023", condition: "Rare Neurological Condition" },
    { id: 5, name: "David Lee", lastVisit: "June 5, 2023", condition: "Rare Hematological Disorder" },
  ]

  const filteredPatients = demoPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <header className="bg-gray-800/50 backdrop-blur-lg shadow-lg rounded-xl mb-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Doctor Portal</h1>
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10 ring-2 ring-blue-400">
              <AvatarImage src="https://ik.imagekit.io/lsqgqcqgy/avatar_JS.png" alt="Dr. Jane Smith" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <span className="text-sm text-white">Dr. Jane Smith</span>
            <Button onClick={onLogout} variant="secondary">Logout</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <GlassCard className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-gray-700/50 p-1 rounded-lg">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Dashboard</TabsTrigger>
              <TabsTrigger value="patients" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Patients</TabsTrigger>
              <TabsTrigger value="appointments" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Appointments</TabsTrigger>
              <TabsTrigger value="cases" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Case Browser</TabsTrigger>
              <TabsTrigger value="consultations" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Video Consultations</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <GlassCard className="p-6" animate={true}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Welcome, Dr. Smith!</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <GlassCard className="p-4" animate={true}>
                      <h3 className="text-lg font-semibold text-white mb-2">Today's Schedule</h3>
                      <p className="text-gray-300">You have 5 appointments today</p>
                      <Button variant="secondary" className="mt-2">View Schedule</Button>
                    </GlassCard>
                    <GlassCard className="p-4" animate={true}>
                      <h3 className="text-lg font-semibold text-white mb-2">New Patient Requests</h3>
                      <p className="text-gray-300">You have 3 new patient requests</p>
                      <Button variant="secondary" className="mt-2">Review Requests</Button>
                    </GlassCard>
                  </div>
                </CardContent>
              </GlassCard>
            </TabsContent>

            <TabsContent value="patients">
              <GlassCard className="p-6" animate={true}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white mb-4">Your Patients</CardTitle>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search patients by name or condition"
                      className="pl-10 bg-gray-700/50 backdrop-blur-md text-white placeholder-gray-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredPatients.map((patient) => (
                      <GlassCard key={patient.id} className="p-4 hover:bg-gray-800/60 transition-colors duration-300" animate={true}>
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`https://ik.imagekit.io/lsqgqcqgy/patient_${patient.id}.png`} alt={patient.name} />
                            <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
                            <p className="text-sm text-gray-300">Last visit: {patient.lastVisit}</p>
                            <p className="text-sm text-gray-300">Condition: {patient.condition}</p>
                          </div>
                          <Button className="ml-auto bg-blue-600 text-white hover:bg-blue-700">View Details</Button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>
            </TabsContent>

            <TabsContent value="appointments">
              <GlassCard className="p-6" animate={true}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((appointment) => (
                      <GlassCard key={appointment} className="p-4 hover:bg-gray-800/60 transition-colors duration-300" animate={true}>
                        <div className="flex items-center space-x-4">
                          <Calendar className="h-6 w-6 text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-white">Patient: Sarah Johnson {appointment}</h3>
                            <p className="text-sm text-gray-300">June {15 + appointment}, 2023 at 10:00 AM</p>
                          </div>
                          <Button variant="outline" className="ml-auto text-white border-white hover:bg-blue-600 hover:text-white">Prepare Notes</Button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>
            </TabsContent>

            <TabsContent value="cases">
              <GlassCard className="p-6" animate={true}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Case Browser</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input type="text" placeholder="Search cases by symptoms or patient name" className="mb-4 bg-gray-700/50 backdrop-blur-md text-white placeholder-gray-400" />
                  <div className="space-y-4">
                    {[1, 2, 3].map((caseItem) => (
                      <GlassCard key={caseItem} className="p-4 hover:bg-gray-800/60 transition-colors duration-300" animate={true}>
                        <div className="flex items-center space-x-4">
                          <FileText className="h-6 w-6 text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-white">Case #{caseItem}</h3>
                            <p className="text-sm text-gray-300">Patient: Anonymous</p>
                            <p className="text-sm text-gray-300">Symptoms: Unusual skin rash, joint pain</p>
                          </div>
                          <Button variant="outline" className="ml-auto text-white border-white hover:bg-blue-600 hover:text-white">Review</Button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>
            </TabsContent>

            <TabsContent value="consultations">
              <GlassCard className="p-6" animate={true}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Video Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((consultation) => (
                      <GlassCard key={consultation} className="p-4 hover:bg-gray-800/60 transition-colors duration-300" animate={true}>
                        <div className="flex items-center space-x-4">
                          <Video className="h-6 w-6 text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-white">Consultation with Patient {consultation}</h3>
                            <p className="text-sm text-gray-300">Scheduled for June {20 + consultation}, 2023 at 2:00 PM</p>
                          </div>
                          <Button variant="outline" className="ml-auto text-white border-white hover:bg-blue-600 hover:text-white">Join Call</Button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </GlassCard>
      </main>
    </div>
  )
}

// Researcher Portal Component
function ResearcherPortal({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')

  const demoPublications = [
    { id: 1, title: "Advances in Rare Disease Genomics", date: "May 10, 2023", journal: "Journal of Rare Disorders" },
    { id: 2, title: "AI in Rare Disease Diagnosis", date: "April 15, 2023", journal: "Artificial Intelligence in Medicine" },
    { id: 3, title: "Novel Treatments for Rare Metabolic Disorders", date: "March 22, 2023", journal: "Rare Disease Therapeutics" },
    { id: 4, title: "Genetic Counseling in the Era of Precision Medicine", date: "February 5, 2023", journal: "Journal of Genetic Counseling" },
    { id: 5, title: "Rare Disease Registries: A Global Perspective", date: "January 18, 2023", journal: "Orphanet Journal of Rare Diseases" },
  ]

  const filteredPublications = demoPublications.filter(pub =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.journal.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <header className="bg-gray-800/50 backdrop-blur-lg shadow-lg rounded-xl mb-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Researcher Portal</h1>
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10 ring-2 ring-blue-400">
              <AvatarImage src="https://ik.imagekit.io/lsqgqcqgy/avatar_EJ.png" alt="Dr. Emily Johnson" />
              <AvatarFallback>EJ</AvatarFallback>
            </Avatar>
            <span className="text-sm text-white">Dr. Emily Johnson</span>
            <Button onClick={onLogout} variant="secondary">Logout</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <GlassCard className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-gray-700/50 p-1 rounded-lg">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Dashboard</TabsTrigger>
              <TabsTrigger value="publications" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Publications</TabsTrigger>
              <TabsTrigger value="collaboration" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Collaboration Hub</TabsTrigger>
              <TabsTrigger value="data-analysis" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Data Analysis</TabsTrigger>
              <TabsTrigger value="case-insights" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Case Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <GlassCard className="p-6" animate={true}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Welcome, Dr. Johnson!</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <GlassCard className="p-4" animate={true}>
                      <h3 className="text-lg font-semibold text-white mb-2">Recent Publications</h3>
                      <p className="text-gray-300">You have 2 new publications this month</p>
                      <Button variant="secondary" className="mt-2">View Publications</Button>
                    </GlassCard>
                    <GlassCard className="p-4" animate={true}>
                      <h3 className="text-lg font-semibold text-white mb-2">Ongoing Collaborations</h3>
                      <p className="text-gray-300">You are part of 3 active research teams</p>
                      <Button variant="secondary" className="mt-2">View Collaborations</Button>
                    </GlassCard>
                  </div>
                </CardContent>
              </GlassCard>
            </TabsContent>

            <TabsContent value="publications">
              <GlassCard className="p-6" animate={true}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white mb-4">Your Publications</CardTitle>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search publications by title or journal"
                      className="pl-10 bg-gray-700/50 backdrop-blur-md text-white placeholder-gray-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredPublications.map((publication) => (
                      <GlassCard key={publication.id} className="p-4 hover:bg-gray-800/60 transition-colors duration-300" animate={true}>
                        <div className="flex items-center space-x-4">
                          <BookOpen className="h-6 w-6 text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-white">{publication.title}</h3>
                            <p className="text-sm text-gray-300">Published: {publication.date}</p>
                            <p className="text-sm text-gray-300">Journal: {publication.journal}</p>
                          </div>
                          <Button className="ml-auto bg-blue-600 text-white hover:bg-blue-700">View Details</Button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>
            </TabsContent>

            <TabsContent value="collaboration">
              <GlassCard className="p-6" animate={true}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Collaboration Hub</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((collaboration) => (
                      <GlassCard key={collaboration} className="p-4 hover:bg-gray-800/60 transition-colors duration-300" animate={true}>
                        <div className="flex items-center space-x-4">
                          <Users className="h-6 w-6 text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-white">Research Team {collaboration}</h3>
                            <p className="text-sm text-gray-300">Topic: Rare Disease Genomics</p>
                          </div>
                          <Button variant="outline" className="ml-auto text-white border-white hover:bg-blue-600 hover:text-white">Join Discussion</Button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>
            </TabsContent>

            <TabsContent value="data-analysis">
              <GlassCard className="p-6" animate={true}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Data Analysis Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Rare Disease Prevalence', 'Treatment Efficacy', 'Genetic Variant Analysis'].map((tool, index) => (
                      <GlassCard key={index} className="p-4 hover:bg-gray-800/60 transition-colors duration-300" animate={true}>
                        <div className="flex items-center space-x-4">
                          <BarChart className="h-6 w-6 text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-white">{tool}</h3>
                            <p className="text-sm text-gray-300">Analyze anonymized data</p>
                          </div>
                          <Button variant="outline" className="ml-auto text-white border-white hover:bg-blue-600 hover:text-white">Open Tool</Button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>
            </TabsContent>

            <TabsContent value="case-insights">
              <GlassCard className="p-6" animate={true}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Case Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input type="text" placeholder="Search cases by symptoms or condition" className="mb-4 bg-gray-700/50 backdrop-blur-md text-white placeholder-gray-400" />
                  <div className="space-y-4">
                    {[1, 2, 3].map((caseItem) => (
                      <GlassCard key={caseItem} className="p-4 hover:bg-gray-800/60 transition-colors duration-300" animate={true}>
                        <div className="flex items-center space-x-4">
                          <FileText className="h-6 w-6 text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-white">Case Study #{caseItem}</h3>
                            <p className="text-sm text-gray-300">Condition: Ultra-Rare Genetic Disorder</p>
                          </div>
                          <Button variant="outline" className="ml-auto text-white border-white hover:bg-blue-600 hover:text-white">Provide Insight</Button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </GlassCard>
      </main>
    </div>
  )
}

// Main App Component
function Component() {
  const [user, setUser] = useState(null)

  const handleLogin = (role) => {
    setUser({ role })
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {!user ? (
        <LandingPage onLogin={handleLogin} />
      ) : user.role === 'patient' ? (
        <PatientPortal onLogout={handleLogout} />
      ) : user.role === 'doctor' ? (
        <DoctorPortal onLogout={handleLogout} />
      ) : (
        <ResearcherPortal onLogout={handleLogout} />
      )}
    </div>
  )
}

export default Component
