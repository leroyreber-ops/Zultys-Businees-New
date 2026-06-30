import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ScrollToTop } from '../components/ScrollToTop';
import { useQuote } from '../context/QuoteContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  GraduationCap, 
  Shield, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Clock, 
  Phone,
  Bell,
  BookOpen
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  ZULTYS_FORT_WORTH_BG,
  SUPPORT_TEAM,
  OFFICE_COMMUNICATION,
} from '../constants/images';

export function Education() {
  const { openQuote } = useQuote();

  useEffect(() => {
    document.title = 'Zultys for Education | School & Campus Phone Systems Fort Worth';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Zultys communication solutions for schools and campuses in Fort Worth. Campus safety, classroom communication, and reliable phone systems for DFW education.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // JSON-LD Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Zultys Education Communication Solutions',
      description: 'Specialized communication systems for K-12 schools and higher education in Dallas-Fort Worth.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'DFW Business Communications'
      },
      areaServed: 'Dallas-Fort Worth'
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          title={<>Zultys for <span className="text-zultys-green">Schools & Campuses.</span></>}
          subtitle="Reliable, secure, and integrated communication systems designed to enhance campus safety and streamline educational operations in DFW."
          icon={GraduationCap}
          iconLabel="Education Solutions"
          buttonText="Request Education Consultation"
          onButtonClick={openQuote}
        />

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Safety, Reliability, & Collaboration</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Zultys provides the tools schools need to keep students safe and staff connected.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Campus Safety',
                  description: 'Integrated emergency notification systems and E911 capabilities to protect your DFW campus.',
                  icon: Shield,
                },
                {
                  title: 'Classroom Connectivity',
                  description: 'Reliable classroom communication tools that allow teachers to stay connected with the front office.',
                  icon: Bell,
                },
                {
                  title: 'Staff Collaboration',
                  description: 'Unified messaging and presence status help administrators and teachers coordinate effectively.',
                  icon: Users,
                },
              ].map((benefit, index) => (
                <Card key={index} className="p-8 border-slate-200 hover:border-blue-500 transition-colors">
                  <div className="p-3 bg-blue-100 rounded-xl w-fit mb-6">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Content Section 1: Introduction */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Zultys for Education: Secure and Reliable Communications for DFW Schools and Campuses
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    In the educational sector, communication is about more than just administrative efficiency—it's a fundamental component of campus safety and student success. For K-12 schools, private academies, and higher education institutions in the Dallas-Fort Worth area, the ability to connect staff, students, and parents quickly and reliably is essential. <strong>Zultys education phone systems Fort Worth</strong> are designed to meet the unique and demanding requirements of the modern campus, providing a robust, secure, and highly flexible communication platform that serves the entire DFW metroplex.
                  </p>
                  <p>
                    From the front office to the classroom, and from the athletic fields to the security desk, every part of your campus needs to be connected. Zultys provides a unified communications environment that ensures emergency notifications are delivered instantly, administrative tasks are streamlined, and collaboration between teachers and staff is effortless in your North Texas school. Whether you are a single-campus school in Fort Worth or a large, multi-site district in Dallas, Zultys delivers the enterprise-grade tools you need to create a safe and productive learning environment for your DFW students.
                  </p>
                  <p>
                    At DFW Business Communications, we have extensive experience working with educational institutions across North Texas. We understand the critical importance of campus safety, the need for reliable E911 services, and the budget constraints often faced by schools in the DFW area. We are dedicated to providing <strong>school communication systems in DFW</strong> that are both powerful and cost-effective, allowing you to focus on your primary mission—education. Our local presence in Fort Worth ensures that we can provide rapid, on-site support and a level of personal service that national providers simply can't match.
                  </p>
                  <p>
                    Our approach to education communications is comprehensive. We don't just provide a phone system; we provide a complete communication strategy that aligns with your school's safety and educational goals. We work closely with your administrative and security teams to ensure that your Zultys solution is optimized for your specific campus layout and operational needs in the DFW metroplex.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-50 border border-slate-100 p-4">
                  <ImageWithFallback
                    src={OFFICE_COMMUNICATION}
                    alt="School Administration Communications DFW"
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 2: Campus Safety */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Campus Safety and Emergency Response: A Top Priority for DFW Schools</h2>
              <p className="text-xl text-gray-600">
                In an emergency, every second counts. Zultys provides the tools needed to alert your DFW campus and coordinate a rapid response in North Texas.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                For any school in the DFW area, the safety of students and staff is the highest priority. Your communication system must be a central part of your emergency response plan. The <strong>Zultys MX platform</strong> includes powerful features designed to alert your entire campus instantly in the event of an emergency, providing peace of mind for parents and staff across North Texas.
              </p>
              <p>
                Integrated emergency notification systems can be configured to send alerts across multiple channels simultaneously, including overhead paging, desk phone speakers, mobile apps, and even desktop notifications in your DFW school. This ensures that everyone on campus—whether they are in a classroom, the cafeteria, or on the playground—receives the message immediately. You can also create pre-recorded "lockdown" or "evacuation" messages that can be triggered with a single button press, ensuring a clear and consistent message during a high-stress situation in your North Texas facility.
              </p>
              <p>
                Furthermore, Zultys supports integration with external security systems, such as door access control and video surveillance. This allows for a more coordinated and effective response to security incidents on your DFW campus. You can also leverage Zultys' reporting capabilities to review emergency response performance and identify areas for improvement in your North Texas school.
              </p>
              <p>
                Key safety features for DFW schools include:
              </p>
              <ul className="grid md:grid-cols-2 gap-6 mt-8 list-none pl-0">
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Instant Alerts</strong>
                  Trigger campus-wide notifications across all devices with a single action, ensuring rapid communication in DFW.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Overhead Paging Integration</strong>
                  Connect your Zultys system to your existing overhead paging for seamless campus-wide announcements in your North Texas school.</li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Secure Messaging</strong>
                  Allow security and administrative staff to coordinate silently and securely during an incident on your DFW campus.
                </li>
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <strong className="text-blue-600 block mb-2 text-xl">Mobile Connectivity</strong>
                  Ensure that campus security and roving staff stay connected through the MXmobile app, no matter where they are in DFW.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 3: E911 */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-900 p-4">
                  <ImageWithFallback
                    src={SUPPORT_TEAM}
                    alt="E911 and Safety with Zultys Education Solutions"
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  E911 and Location Tracking for Rapid Response in DFW
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    When a 911 call is made from a large campus, it's not enough for emergency responders to know the main address. They need to know exactly where on campus the call originated. <strong>Zultys education solutions</strong> include advanced E911 capabilities that provide precise location information to emergency dispatchers in the Dallas-Fort Worth area.
                  </p>
                  <p>
                    The system can be configured to provide the specific building, floor, and room number for every desk phone on your DFW campus. Furthermore, when a 911 call is placed, the system can automatically alert campus security and administrative staff, providing them with the same location information so they can assist responders and manage the situation on-site in North Texas.
                  </p>
                  <p>
                    Zultys also supports dynamic location tracking for mobile users, ensuring that even if a call is placed from a smartphone using the MXmobile app, responders can still identify the caller's location on your DFW campus. This is a critical feature for ensuring the safety of students and staff who are constantly on the move.
                  </p>
                  <p>
                    For DFW educational institutions, these E911 features lead to:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Faster Emergency Response:</strong> Responders spend less time searching for the location and more time providing aid in your DFW school.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Improved Situational Awareness:</strong> Campus staff are immediately notified of emergencies and their location in North Texas.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Compliance:</strong> Meet state and federal requirements for E911 location accuracy (Kari's Law and RAY BAUM'S Act) in the DFW area.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Emergency Drills and Automation */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Automating Emergency Drills and Protocols in DFW</h2>
              <p className="text-xl text-gray-600">
                Practice makes perfect, especially when it comes to safety. Zultys helps North Texas schools automate and track their emergency drills.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p>
                Regular emergency drills are a requirement for all schools in the Dallas-Fort Worth area. <strong>Zultys education solutions</strong> allow you to automate these drills, ensuring that they are conducted consistently and that all staff are familiar with the protocols. You can create pre-configured "drill modes" that trigger specific notifications and alerts across your DFW campus, allowing you to practice for various scenarios, from fire drills to lockdown procedures.
              </p>
              <p>
                The system also provides detailed logging and reporting for every drill conducted in your North Texas school. This allows you to track participation, identify any issues or delays, and demonstrate compliance with state safety requirements in the DFW area. By automating these processes, you reduce the administrative burden on your staff and ensure that your campus is always prepared for a real emergency.
              </p>
              <p>
                At DFW Business Communications, we work with your school's safety officer to develop and implement <strong>automated drill protocols</strong> that align with your specific emergency response plan in the Dallas-Fort Worth region.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 4: School Administration */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-4xl font-bold mb-6">Streamlining School Administration and Operations in DFW</h2>
              <p className="text-xl text-white">
                Efficiency in the front office allows for more focus on the classroom. Zultys automates and simplifies your daily communication tasks in North Texas.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="prose prose-lg prose-invert text-white max-w-none">
                <p>
                  The administrative burden on school staff is significant. Managing student attendance, handling parent inquiries, and coordinating with various departments can be overwhelming. The <strong>Zultys MX platform</strong> includes features designed to automate many of these tasks for your DFW school. For example, advanced auto-attendants can provide parents with quick access to common information, such as school hours, event schedules, or attendance lines, freeing up office staff for more complex duties in your North Texas facility.
                </p>
                <p>
                  Zultys also simplifies internal communication. Presence awareness allows office staff to see if a teacher or administrator is available before attempting to transfer a call or send a message. Integrated instant messaging allows for quick, silent communication between staff members, even during class time in your DFW school. This reduces interruptions and allows for a more focused and productive learning environment.
                </p>
              </div>
              <div className="prose prose-lg prose-invert text-white max-w-none">
                <p>
                  For DFW schools, these operational efficiencies translate into a more calm and productive environment. At DFW Business Communications, we work with your team to identify bottlenecks and implement <strong>Zultys features</strong> that streamline your specific workflows and enhance your school's overall performance in North Texas.
                </p>
                <p>
                  We ensure that your system is configured to support your unique needs, from custom call routing for after-hours events to integrated fax-to-email for secure document handling in the DFW metroplex. Our goal is to provide you with a communication platform that works as hard as you do.
                </p>
                <p>
                  We also provide ongoing support and maintenance for your DFW school system, ensuring that it is always operating at peak efficiency and that your staff has the tools they need to provide the best possible education for your students.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 5: Staff Collaboration */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Enhancing Teacher and Staff Collaboration in DFW
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    Effective collaboration between teachers and staff is essential for student success. The <strong>Zultys Advanced Communicator (ZAC)</strong> provides a unified interface for all their communication needs in the Dallas-Fort Worth area. Teachers can easily stay connected with the front office, coordinate with colleagues on lesson plans, and manage parent communications, all from a single, easy-to-use window in your North Texas school.
                  </p>
                  <p>
                    Features like integrated instant messaging and presence awareness allow for quick and efficient coordination, while integrated video conferencing supports virtual meetings and professional development for your DFW staff. The MXmobile app ensures that staff stay connected even when they are away from their desks, whether they are on playground duty, at an athletic event, or working from home in the DFW metroplex.
                  </p>
                  <p>
                    Zultys also supports shared workspaces and document collaboration tools, allowing teachers to easily share resources and work together on curriculum development. This level of collaboration is vital for fostering a supportive and innovative educational environment in North Texas.
                  </p>
                  <p>
                    For DFW educational institutions, this collaboration is a game-changer:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Improved Coordination:</strong> Reduce the time spent trying to track down colleagues and information in your DFW school.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Better Teamwork:</strong> Foster a more collaborative and productive educational environment across North Texas.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Enhanced Flexibility:</strong> Support remote work and distributed teams with ease in the DFW area.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center">
                  <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-bold">Classroom</h4>
                  <p className="text-sm text-gray-600">Stay connected with the front office from any DFW classroom.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                  <Users className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h4 className="font-bold">Admin</h4>
                  <p className="text-sm text-gray-600">Coordinate effectively across all departments in North Texas.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                  <Bell className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h4 className="font-bold">Safety</h4>
                  <p className="text-sm text-gray-600">Instant notifications for security and staff in DFW.</p>
                </div>
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center">
                  <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-bold">Speed</h4>
                  <p className="text-sm text-gray-600">Instant access to critical information and people in North Texas.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Parent-Teacher Communication and Engagement */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-4 border border-slate-200">
                  <ImageWithFallback
                    src="https://picsum.photos/seed/education/1200/800"
                    alt="Parent-Teacher Communication DFW"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Strengthening Parent-Teacher Communication in DFW
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    Effective communication between parents and teachers is a key driver of student success. <strong>Zultys education solutions</strong> provide the tools needed to foster these important connections in the Dallas-Fort Worth area. Teachers can easily manage parent inquiries through a variety of channels, including voice, email, and secure messaging, ensuring that parents always feel supported and informed about their child's progress in your North Texas school.
                  </p>
                  <p>
                    Features like integrated voicemail-to-email allow teachers to receive and respond to parent messages even when they are in the classroom or away from their desks. Automated notification systems can also be used to send important updates to parents, such as school closures, event reminders, or attendance alerts, ensuring that they are always in the loop in the DFW metroplex.
                  </p>
                  <p>
                    Zultys also supports virtual parent-teacher conferences through its integrated video conferencing platform. This provides a convenient and flexible option for busy parents in the DFW area, allowing them to participate in their child's education from anywhere.
                  </p>
                  <p>
                    For DFW schools, improved parent engagement leads to:
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Better Student Outcomes:</strong> Increased parent involvement is directly linked to improved student performance in North Texas.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Improved Satisfaction:</strong> Parents value the convenience and transparency provided by modern communication tools in the DFW area.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span><strong>Stronger Community:</strong> Foster a more connected and supportive school community across the Dallas-Fort Worth metroplex.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 6: Paging & Intercom */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Integrated Paging and Intercom Systems for DFW Campuses</h2>
              <p className="text-xl text-gray-600">
                Connect your communications with your campus-wide paging for a more informed and safe school in North Texas.
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>
                Effective campus-wide communication requires a reliable paging and intercom system. <strong>Zultys education solutions</strong> integrate seamlessly with many popular overhead paging systems used by DFW schools, allowing you to make announcements directly from any Zultys handset or the ZAC desktop client in your North Texas facility.
              </p>
              <p>
                This integration allows for powerful features like zone-based paging, where announcements can be directed to specific buildings, floors, or areas of your DFW campus. It also supports two-way intercom communication, allowing the front office to speak directly with individual classrooms or security points in your North Texas school. This is a vital feature for both daily operations and emergency situations.
              </p>
              <p>
                Zultys also supports integration with IP-based paging systems, providing even greater flexibility and control over your campus communications in the DFW area. You can easily manage your paging zones and schedules through the Zultys administrative interface, ensuring that your announcements are always delivered to the right place at the right time.
              </p>
              <p>
                For DFW schools, this integration means:
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Campus-Wide Reach:</strong> Ensure that your announcements are heard by everyone, everywhere on your DFW campus.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Targeted Communication:</strong> Use zone-based paging to send messages only where they are needed in your North Texas school.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Improved Safety:</strong> Use the paging system as a central part of your emergency notification plan in the DFW area.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 7: Scalability */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Scalability for Growing School Districts and Campuses in DFW
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>
                    The educational landscape is constantly changing, and your communication system must be able to adapt. Whether you are adding new classrooms, opening new campuses, or expanding your administrative staff, the <strong>Zultys MX platform</strong> provides the scalability you need in the Dallas-Fort Worth area.
                  </p>
                  <p>
                    You can easily add new users and features as your school grows, without the need for expensive hardware upgrades. Zultys' flexible licensing model allows you to pay for only what you need, making it a cost-effective solution for institutions of all sizes in North Texas. Whether you choose an on-premise appliance or a cloud-based solution, Zultys ensures that your communications remain functional and scalable for your DFW school.
                  </p>
                  <p>
                    Zultys also supports multi-site deployment, allowing you to connect all your campus locations into a single, unified communication system. This simplifies administration and reduces costs, while ensuring that all your staff and students are connected across the DFW metroplex.
                  </p>
                  <p>
                    At DFW Business Communications, we provide proactive monitoring and support for your <strong>Zultys education system</strong>, ensuring that it is always performing at its best and ready for any situation in the DFW area.
                  </p>
                </div>
              </div>
              <div className="bg-blue-900 rounded-3xl p-12 text-white shadow-2xl">
                <Shield className="h-16 w-16 text-blue-400 mb-8" />
                <h3 className="text-3xl font-bold mb-6">Education Scalability</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Easily Add New Classrooms & Staff in DFW</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Support for Multiple Campus Locations in North Texas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Flexible Licensing & Deployment Options for DFW Schools</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Future-Proof Technology & Regular Updates for North Texas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span>Proven Performance for Districts of All Sizes in DFW</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section 8: Why Choose DFW Business Communications */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-8">Your Local Zultys Education Partner in Fort Worth and Dallas</h2>
            <div className="prose prose-xl prose-invert mx-auto max-w-4xl text-white">
              <p>
                When you choose DFW Business Communications for your <strong>Zultys education solution</strong>, you are choosing a partner with a deep understanding of the North Texas educational community. We've been serving the Dallas-Fort Worth area for over 20 years, and we pride ourselves on providing the highest level of local, personal service to our DFW education clients.
              </p>
              <p>
                From the initial system design and safety review to the final staff training and ongoing support, we are with you every step of the way. We know that in education, every detail matters, and we are dedicated to ensuring that your communication system supports your mission of providing a safe and effective learning environment in the DFW metroplex.
              </p>
              <p>
                Our local presence in Fort Worth allows us to provide rapid, on-site support and a level of personal attention that national providers simply can't match. We are committed to your long-term success and work with you to continuously optimize your Zultys solution as your DFW school grows and evolves.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <GraduationCap className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">Education Expertise in DFW</h4>
                <p className="text-white">We understand the unique communication and safety needs of schools and campuses operating in North Texas.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <Shield className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">Safety Focused for DFW</h4>
                <p className="text-white">We ensure that your system is configured to meet the highest standards of campus safety in the DFW area.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                <Clock className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">24/7 Local DFW Support</h4>
                <p className="text-white">Our Fort Worth based team is always available to support your critical school operations across the DFW metroplex.</p>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
