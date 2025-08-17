---
toc: True
layout: post
title: Agile Development and Design Thinking
description: In most projects in education we complement Learning, LxD, and the Agile Process to achieve development. In this article we focus on Design Thinking.
permalink: /agile/design_thinking
breadcrumb: True 
---
 
## Integrating Agile and LxD

In this article, we compare multiple approaches to learning and development. While many models and frameworks exist, our emphasis will be on three complementary perspectives:

**Adapted Agile** – an iterative, feedback-driven process that guides how learning solutions are planned, built, and refined.

**Design Thinking Process** – a human-centered, creative problem-solving process that ensures solutions meet learner needs.

**Merrill’s Principles of Instruction** – a problem-centered, modular instructional design framework that ensures learning is effective, efficient, and engaging.

These three perspectives form the foundation of the discussion that follows, shaping how we integrate Learning Experience Design (LxD) with Agile methodologies in education.

## Adapted Agile

Agile development and educational design share a common challenge: effective assessment and improvement require intentional planning and feedback.

- In software, Test Driven Development (TDD) ensures that testing is built into the development cycle.
- In education, Backwards Design emphasizes starting with assessment goals before planning instruction.
- Design Thinking brings these ideas together by centering the user—whether that’s a learner or a software customer—through empathy and defining a clear point of view (POV).

This approach ensures that each sprint is not just a sequence of tasks, but a continuous loop of improvement driven by user needs and team reflection.

### SPRINT CYCLE (2–4 Weeks)

1. Sprint Backlog
2. Plan
3. Empathy ↔ Interviews
4. Vision ↔ User Stories → POV
5. Ideate → Issues
6. Standup → Pinup → Kanban
7. Implementation → Test
8. Burndown (ideate review)
9. Retrospective (plan review)

```mermaid
flowchart TD
  A[Sprint Backlog] --> B[Plan]
  B --> C[Empathy ↔ Interviews]
  C --> D[Vision ↔ User Stories → POV]
  D --> E[Ideate → Issues]
  E --> F[Standup]
  F --> G[Pinup → Kanban]
  G --> H[Implementation]
  H --> I[Test]
  I --> J[Burndown]
  J --> K[Retrospective]
  K -.-> B

  %% Feedback loop from Retrospective/Burndown to Plan
  J -.-> E

  %% Optional: Highlight the cycle
  subgraph "Sprint Cycle"
    B
    C
    D
    E
    F
    G
    H
    I
    J
    K
  end
```

## Incorporating Design Thinking (Section 1)

**Instructional Design vs. Learning Experience Design** a comparison.

**Instructional Design** is the traditional approach to creating learning opportunities. It focuses on identifying needs, setting goals, defining assessments, and establishing learning objectives using established frameworks and tools.

**Learning Experience Design (LxD)** evolves this thinking by emphasizing flexibility and responsiveness to the diverse needs, interests, and goals of learners. LxD aims for equitable outcomes and integrates elements from User Experience Design (UxD), graphics, games, and overall learner experience. The shift from Instructional Design to LxD is driven by new technologies, mobile learning, iterative development, and the importance of early feedback.

---

### Human-centered Design

Human-centered design puts the learner at the center of the solution. Content is developed from the learner’s perspective, with the goal of building solutions that are truly adapted to the audience.

The process is cyclical and includes:

- **Inspiration:** Understanding the learner’s context and needs.
- **Idea:** Generating creative solutions.
- **Implementation:** Bringing ideas to life in practical ways.
- **Iteration:** Continuously refining solutions based on feedback.

---

### Learning Experience Design

LxD is about designing learning that adapts to individual needs, interests, and goals, striving for equitable outcomes for all learners.

It incorporates principles from user experience, game design, and graphic design to create engaging and effective learning environments.

The key differences between Instructional Design and LxD are rooted in a more iterative, feedback-driven philosophy, and a focus on mobile and flexible learning.

---

### Instructional Design Process Models

**ADDIE Model:** The most well-known instructional design process, consisting of:

- **Analyze:** Define goals, audience, and resources.
- **Design:** Align instructional strategies to goals.
- **Develop:** Create learning resources and pilot test.
- **Implement:** Integrate resources into the learning environment and engage users.
- **Evaluate:** Assess the effectiveness of instruction and resources.

**SAM (Successive Approximation Model):** Focuses on iterative phases and tasks:

- **Preparation:** Background research and information gathering.
- **Iterative Design:** Design, prototype, and review.
- **Iterative Development:** Develop, implement, and evaluate (Alpha, Beta, Silver, Gold stages). SAM aims to make ADDIE more agile, though it still includes some pre-planned milestones.

- **Understanding by Design (UbD):** A Backwards Design approach:

  - 🎯 Identify desired results.
  - 📊 Determine assessment evidence.
  - 🛠️ Plan learning experiences and instruction.

---

### Design Thinking Process

Design Thinking is an innovative, human-centered, and non-sequential process that is integral to LxD.

The categories include:

- **Empathy:** Use observations, interviews, and focus groups to gain insights into learners’ thoughts and feelings. Understand user needs and challenges through research.
- **Define:** Craft a clear instructional problem statement and Point-Of-View (POV) based on findings. These can be personalized in the form of User Stories.
- **Ideate:** Brainstorm solutions, generating "How Might We" (HMW) questions from the POV to spark creativity.
- **Prototype:** Develop models or examples based on synthesized ideas and HMW questions. Be ready to modify prototypes as testing reveals new insights.
- **Test:** Refine solutions based on user feedback, iterating as needed to improve outcomes.

```mermaid
mindmap
  root((Design Thinking Iteration))
    Empathy
      - Observe
      - Research
    Define
      - Problem 
      - POV
    Ideate
      - Brainstorm
      - HMW
    Prototype
      - Models
      - Lo-Fi
    Test
      - Feedback
      - Refine
```

## Examining Various Approaches to Learning (Section 2)

### Instructional Approaches to Learning

- 🏆 **Behaviorist:** Learners respond to stimuli, and instructors obtain responses. This approach is especially valuable for young learners, where rewards (like gold stars) motivate learning.
- 🧠 **Cognitivist:** Focuses on memorization, organization, repetition, and well-defined problems as a foundation for deeper learning. Learners develop metacognition and adapt previous learning to new contexts. Learning is highly individual.
- 🛠️ **Constructivist:** Authentic learning is achieved by solving or creating real-world solutions. Group formation is key, and deep learning comes from producing tangible results. Learners have more control over their experience, such as choosing projects, compared to scripted learning outputs.
- 🔗 **Connectivist:** Leverages information systems, groups, and cultures with large quantities of information. Learners connect to systems and people to facilitate learning, often using the internet and AI. This approach builds on constructivist principles, with learners actively building knowledge through authentic choices and projects.

---

### Mastery Learning Approaches

- ✅ **Mastery Learning:** Learners must demonstrate mastery of a concept, skill, or procedure before moving on. In large classrooms, this is challenging, but learning analytics and adaptive technologies help personalize instruction and measure student success.
- ⏰ **Traditional Learning:** Progression is dictated by a predefined schedule, moving to the next skill based on time rather than mastery.
- 🏎️ **Competency-Based Education (CBE):** Learners move at their own pace with immediate formative feedback. CBE formalizes mastery learning, with frequent student-teacher interactions to measure success.

---

### Andragogy and Pedagogy

| Aspect                    | Andragogy (Adult Learning)         | Pedagogy (Child Learning)         |
|---------------------------|------------------------------------|-----------------------------------|
| Direction                 | Self-directed                      | Teacher-directed                  |
| Motivation                | Intrinsic                          | Extrinsic                         |
| Experience                | Experience as a resource           | Limited experience                |
| Content                   | Seeks relevant content             | Content defined by teacher        |
| Self-concept              | Established self-concept           | Self-concept dependent on teacher |
| Recognition               | Seeks recognition                  | Learning to reach next level      |
| Orientation               | Learning oriented to needs         | Learning oriented to teacher’s requirements |

---

### Educational Frameworks

- **Bloom’s Taxonomy:**

1. Remember
2. Understand
3. Apply
4. Analyze
5. Evaluate
6. Create

Bloom’s Pyramid illustrates how learning builds upward from the foundational level of Remember to the highest level, Create—emphasizing the concept of constructing knowledge on a solid base.

```text
              ^
            /    \
           /Create\
          /--------\
         / Evaluate \
        /------------\
       /    Analyze   \
      /----------------\
     /       Apply      \
    /--------------------\
   /       Understand     \
  /------------------------\
 /          Remember        \
/ ---------------------------\
 ```

- **Fink’s Significant Learning:** Holistic, affective
  - Intersection: All learning verbs intersect to form Foundational Knowledge. 
  - Foundational Knowledge: Content, facts
  - Application: Connecting concepts, solving problems, making decisions
  - Integration: Transfer knowledge to new subjects and real-world contexts
  - Human Dimension: Collaboration, understanding self and others
  - Caring: Feelings, Values
  - Metacognition: Independent, continual learning, learning to learn

```mermaid
mindmap
  root((Foundational Knowledge))
    Application
      Connecting
      Solving
      Making decisions
    Integration
      Transfer knowledge
      Real-world
    Human Dimension
      Collaboration
      Understanding
    Caring
      Feelings
      Values
    Metacognition
      Independent
      Learning to learn
```

- **Gagne’s 9 Events of Instruction:** Procedural and cognitive
  1. Gain Attention – Spark curiosity and relevance (e.g., compelling question, scenario, icebreaker)
  2. Inform Learners of Objectives – Clearly define purpose and intended outcomes
  3. Prior Learning – Activate or reinforce previous knowledge
  4. Present Content – Introduce concepts, demos, videos
  5. Provide Guidance – Scaffolding, rubrics, examples, references
  6. Elicit Performance (Practice) – Guided or independent work
  7. Provide Feedback – Timely, specific comments
  8. Assess Performance – Evaluate mastery
  9. Enhance Retention and Transfer – Apply in new contexts, use summaries, real-world tasks, reflection

```mermaid
flowchart TD
  A[Gain Attention of Students] --> B[Inform Learners of Objectives]
  B --> C[Stimulate recall of Prior Learning]
  C --> D[Present the Content]
  D --> E[Provide learning Guidance]
  E --> F[Elicit Performance - Practice]
  F --> G[Provide timely Feedback]
  G --> H[Assess Performance]
  H --> I[Enhance Retention and Transfer]
  I -.-> A
```

- **Merrill’s Principles of Instruction:** Problem-based and modular.

- Motto: Make instruction Effective, Efficient, Engaging
  - Focus on Problem-centered, modular approach to learning.
  - Provide a project-based and experiential learning environments.
- Problem-centered: Begin with a real-world task or authentic problem.
  - Show the tasks learners will complete
  - Ensure learners are engaged
  - Progression: begin with basic problems and add complexity
- Activation: Help learners activate prior knowledge
  - Previous Experience: Tap into learners' existing knowledge
  - Provide new experiences: Ensure tasks are interesting and authentic
  - Scaffold learning: begin basic and add complexity
- Demonstration (Show me): Provide clear models or examples
  - Consistency: Provide content that reflects learning outcomes
  - Learner guidance: Provide multiple representations of ideas, concepts, and perspectives
  - Relevant media: Use relevant media to support effective learning
- Application (Let me): Practice and apply learning, guided then independent
  - Practice consistency: Align practice with learning outcomes
  - Diminishing dependence culture: Gradually withdraw coaching to build learning independence
  - Varied problems: Provide opportunities for learners to apply their learning to different contexts
- Integration: Reflect, share, or use new knowledge in meaningful contexts
  - Watch me: Provide opportunities for learners to demonstrate and share learning
  - Reflection: Include reflection activities to recognize progress
  - Creation: Encourage learners to transfer their learning into practical and useful applications in their own lives

#### Learner focused mindmap

Position learners so they receive the right scaffolding and support as they engage with each task.

```mermaid
mindmap
  root((Problem-centered learner))
    Module1((Activate))
      Provide me
      Engage my experience      
    Module2((Demonstrate))
      Show me
      Provide me guidance     
    Module3((Application))
      Let me
      Align my outcomes
    Module4(Integrate)
      Watch me
      Allow me to demo
```

#### Learning task usefulness

Each module in the learning system should be real-world, interesting, and incorporate all the principles of instruction.

```mermaid
mindmap
  root((Real-world tasks))
    Module1((Effective))
      Activate
      Demonstrate
      Apply
      Integrate
    Module2((Efficient))
      Activate
      Demonstrate
      Apply
      Integrate
    Module3((Engaging))
      Activate
      Demonstrate
      Apply
      Integrate
```
