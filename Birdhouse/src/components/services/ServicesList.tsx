import React from 'react';
import { motion } from 'framer-motion';
import { DesktopMockup, MobileMockup, TabletMockup } from '../shared/Mockups';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
export const ServicesList = () => {
  return (
    <div className="flex flex-col gap-40 pb-32">
      {/* Category 1: Strategy & Consulting (Split Screen) */}
      <section className="px-8 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-12 gap-16 items-center">
          <div className="col-span-5">
            <motion.div
              initial={{
                opacity: 0,
                y: 40
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true,
                margin: '-100px'
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
              }}>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm">
                  01
                </span>
                <span className="w-8 h-[1px] bg-surface-300"></span>
                <span className="text-surface-500 font-medium text-sm">
                  Strategy & Consulting
                </span>
              </div>

              <h2 className="text-5xl font-extrabold text-surface-900 mb-8 leading-tight">
                Laying the foundation for scalable growth.
              </h2>

              <div className="space-y-10">
                <div>
                  <h3 className="text-2xl font-bold text-surface-900 mb-3">
                    Product Strategy
                  </h3>
                  <p className="text-surface-500 leading-relaxed text-lg">
                    We align your business goals with user needs, defining a
                    clear roadmap that minimizes risk and maximizes market
                    impact before a single line of code is written.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-surface-900 mb-3">
                    Digital Transformation Consulting
                  </h3>
                  <p className="text-surface-500 leading-relaxed text-lg">
                    Modernize legacy systems and workflows. We guide enterprise
                    teams through complex technological shifts to improve
                    efficiency and agility.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="col-span-7 relative h-[700px] rounded-[2.5rem] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1600"
              alt="Team collaborating on strategy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            
            <div className="absolute inset-0 bg-surface-900/20 group-hover:bg-surface-900/10 transition-colors duration-500"></div>

            <motion.div
              initial={{
                opacity: 0,
                x: 40
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.7,
                delay: 0.3
              }}
              className="absolute bottom-10 left-10 glass-panel p-8 rounded-2xl max-w-sm">
              
              <h4 className="text-sm font-bold text-surface-900 uppercase tracking-wider mb-2">
                Measurable Outcome
              </h4>
              <div className="text-4xl font-extrabold text-emerald-600 mb-2">
                +40%
              </div>
              <p className="text-surface-800 font-medium">
                Increase in operational efficiency through streamlined digital
                workflows.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category 2: Design & Experience (Bento Grid) */}
      <section className="px-8 max-w-[1600px] mx-auto w-full">
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-100px'
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="mb-16">
          
          <div className="flex items-center gap-3 mb-6">
            <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm">
              02
            </span>
            <span className="w-8 h-[1px] bg-surface-300"></span>
            <span className="text-surface-500 font-medium text-sm">
              Design & Experience
            </span>
          </div>
          <h2 className="text-5xl font-extrabold text-surface-900 leading-tight max-w-3xl">
            Crafting intuitive interfaces that users love.
          </h2>
        </motion.div>

        <div className="grid grid-cols-12 grid-rows-2 gap-6 h-[900px]">
          {/* Main Desktop Mockup */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true,
              margin: '-100px'
            }}
            transition={{
              duration: 0.7
            }}
            className="col-span-8 row-span-1 bg-surface-100 rounded-[2rem] p-12 relative overflow-hidden group">
            
            <div className="relative z-10 w-1/2">
              <h3 className="text-3xl font-bold text-surface-900 mb-4">
                UI/UX & Product Design
              </h3>
              <p className="text-surface-600 text-lg">
                We design end-to-end product experiences that are visually
                stunning, highly accessible, and engineered for conversion.
              </p>
            </div>
            <div className="absolute right-[-10%] bottom-[-20%] w-[700px] transition-transform duration-700 group-hover:-translate-y-4 group-hover:-translate-x-4">
              <DesktopMockup className="h-[450px] shadow-xl" type="dashboard" />
            </div>
          </motion.div>

          {/* Mobile Mockup */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true,
              margin: '-100px'
            }}
            transition={{
              duration: 0.7,
              delay: 0.1
            }}
            className="col-span-4 row-span-2 bg-emerald-900 rounded-[2rem] p-12 relative overflow-hidden group text-white">
            
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-700 via-emerald-900 to-emerald-950"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Website Design</h3>
              <p className="text-emerald-100/80 text-lg mb-8">
                Award-winning marketing sites that tell your brand's story and
                drive measurable leads.
              </p>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-5%] w-[300px] transition-transform duration-700 group-hover:-translate-y-6">
              <MobileMockup
                className="h-[600px] shadow-2xl border-surface-800"
                type="marketing" />
              
            </div>
          </motion.div>

          {/* Design Systems */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true,
              margin: '-100px'
            }}
            transition={{
              duration: 0.7,
              delay: 0.2
            }}
            className="col-span-8 row-span-1 bg-white border border-surface-200 rounded-[2rem] p-12 flex flex-col justify-center group hover:border-emerald-200 transition-colors duration-300">
            
            <div className="grid grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-surface-900 mb-4">
                  Design Systems
                </h3>
                <p className="text-surface-600 text-lg mb-8">
                  We build comprehensive, token-driven design systems that
                  ensure visual consistency across all your digital touchpoints
                  and accelerate engineering velocity.
                </p>
                <ul className="space-y-3">
                  {[
                  'Component Libraries',
                  'Design Tokens',
                  'Documentation',
                  'Figma Architecture'].
                  map((item, i) =>
                  <li
                    key={i}
                    className="flex items-center gap-3 text-surface-900 font-medium">
                    
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      {item}
                    </li>
                  )}
                </ul>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 space-y-4">
                  <div className="h-24 bg-surface-100 rounded-xl border border-surface-200"></div>
                  <div className="h-32 bg-emerald-50 rounded-xl border border-emerald-100"></div>
                </div>
                <div className="flex-1 space-y-4 mt-8">
                  <div className="h-32 bg-surface-900 rounded-xl"></div>
                  <div className="h-24 bg-surface-100 rounded-xl border border-surface-200"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category 3: Engineering (Overlapping Mockups) */}
      <section className="px-8 max-w-[1600px] mx-auto w-full">
        <div className="bg-surface-50 rounded-[3rem] p-20 relative overflow-hidden">
          <div className="grid grid-cols-12 gap-16 items-center relative z-10">
            <div className="col-span-5">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 40
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true,
                  margin: '-100px'
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1]
                }}>
                
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm">
                    03
                  </span>
                  <span className="w-8 h-[1px] bg-surface-300"></span>
                  <span className="text-surface-500 font-medium text-sm">
                    Engineering & Architecture
                  </span>
                </div>

                <h2 className="text-5xl font-extrabold text-surface-900 mb-12 leading-tight">
                  Robust software built for scale.
                </h2>

                <div className="space-y-10">
                  <div>
                    <h3 className="text-2xl font-bold text-surface-900 mb-3">
                      Custom Software Development
                    </h3>
                    <p className="text-surface-500 leading-relaxed text-lg">
                      Bespoke backend architectures and APIs designed to handle
                      complex business logic, high traffic, and strict security
                      requirements.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-surface-900 mb-3">
                      Web & Mobile Applications
                    </h3>
                    <p className="text-surface-500 leading-relaxed text-lg">
                      High-performance React, Next.js, and React Native
                      applications that deliver native-like experiences across
                      all devices.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-surface-900 mb-3">
                      Website Development
                    </h3>
                    <p className="text-surface-500 leading-relaxed text-lg">
                      Lightning-fast headless CMS implementations and marketing
                      sites optimized for SEO and conversion.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="col-span-7 relative h-[800px] flex items-center justify-center group">
              <motion.div
                initial={{
                  opacity: 0,
                  x: 100
                }}
                whileInView={{
                  opacity: 1,
                  x: 0
                }}
                viewport={{
                  once: true,
                  margin: '-100px'
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute right-0 top-[10%] w-[800px] z-10 transition-transform duration-700 group-hover:-translate-y-4">
                
                <DesktopMockup
                  className="h-[550px] shadow-2xl"
                  type="dashboard" />
                
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 100
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true,
                  margin: '-100px'
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute left-[5%] bottom-[15%] w-[350px] z-20 transition-transform duration-700 group-hover:-translate-y-8">
                
                <TabletMockup
                  className="h-[500px] shadow-2xl"
                  type="dashboard" />
                
              </motion.div>

              {/* Floating Code Snippet */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.5
                }}
                className="absolute right-[10%] bottom-[25%] z-30 bg-surface-900 p-6 rounded-xl shadow-2xl w-72 border border-surface-800">
                
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-surface-700"></div>
                  <div className="w-3 h-3 rounded-full bg-surface-700"></div>
                  <div className="w-3 h-3 rounded-full bg-surface-700"></div>
                </div>
                <div className="font-mono text-sm text-emerald-400">
                  <span className="text-surface-400">const</span> scale{' '}
                  <span className="text-surface-400">=</span>{' '}
                  <span className="text-amber-300">async</span> (){' '}
                  <span className="text-surface-400">=&gt;</span> {'{'}
                  <br />
                  &nbsp;&nbsp;<span className="text-surface-400">
                    await
                  </span>{' '}
                  system.optimize();
                  <br />
                  &nbsp;&nbsp;<span className="text-surface-400">
                    return
                  </span>{' '}
                  <span className="text-emerald-300">true</span>;
                  <br />
                  {'}'}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Category 4: Innovation & Growth (Split Screen Reversed) */}
      <section className="px-8 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-12 gap-16 items-center">
          <div className="col-span-7 relative h-[700px] rounded-[2.5rem] overflow-hidden group bg-surface-900 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-surface-900 to-surface-900"></div>

            {/* Abstract AI/Growth Visual */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-20">
              <div className="w-full h-full border border-surface-800 rounded-2xl relative overflow-hidden flex items-end p-8">
                <div className="absolute top-8 left-8">
                  <div className="text-surface-400 text-sm font-mono mb-2">
                    PREDICTIVE_MODEL_V2
                  </div>
                  <div className="text-3xl font-bold text-white">
                    98.4% Accuracy
                  </div>
                </div>
                <div className="w-full flex items-end gap-4 h-64">
                  {[30, 45, 40, 60, 55, 75, 70, 90, 85, 100].map((h, i) =>
                  <motion.div
                    key={i}
                    initial={{
                      height: 0
                    }}
                    whileInView={{
                      height: `${h}%`
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      ease: 'easeOut'
                    }}
                    className="flex-1 bg-emerald-500/20 rounded-t-md relative group-hover:bg-emerald-500/40 transition-colors">
                    
                      <div
                      className="absolute bottom-0 w-full bg-emerald-500 rounded-t-md"
                      style={{
                        height: '4px'
                      }}>
                    </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-5">
            <motion.div
              initial={{
                opacity: 0,
                y: 40
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true,
                margin: '-100px'
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
              }}>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm">
                  04
                </span>
                <span className="w-8 h-[1px] bg-surface-300"></span>
                <span className="text-surface-500 font-medium text-sm">
                  Innovation & Growth
                </span>
              </div>

              <h2 className="text-5xl font-extrabold text-surface-900 mb-8 leading-tight">
                Future-proofing your business.
              </h2>

              <div className="space-y-10">
                <div>
                  <h3 className="text-2xl font-bold text-surface-900 mb-3">
                    AI Solutions & Automation
                  </h3>
                  <p className="text-surface-500 leading-relaxed text-lg">
                    Integrate cutting-edge LLMs and machine learning models into
                    your products to automate workflows, personalize user
                    experiences, and unlock new revenue streams.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-surface-900 mb-3">
                    Product Optimization & Growth
                  </h3>
                  <p className="text-surface-500 leading-relaxed text-lg">
                    Continuous iteration based on real user data. We implement
                    advanced analytics, A/B testing, and conversion rate
                    optimization to maximize ROI.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>);

};