import { relations } from "drizzle-orm";
import { pgTable, serial, text, integer, pgEnum, boolean } from "drizzle-orm/pg-core";

export const course = pgTable("course", {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    imageSrc: text('image_src').notNull(),
});

export const courseRelations = relations(course, ({ many }) => ({
    userProgress: many(userProgress),
    units: many(units)
}));

export const units = pgTable("units", {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    courseId: integer('courseId').references(() => course.id, { 
        onDelete: "cascade"
    }).notNull(),
    order: integer('courseId').notNull()
});

export const unitsRelations = relations(units, ({ many, one }) => ({
    course: one(course, {
        fields: [units.courseId],
        references: [course.id]
    }),
    lesson: many(lessons)
}));

export const lessons = pgTable('lessons', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    unitId: integer('unit_id').references(() => units.id, {
        onDelete: "cascade"
    }).notNull(),
    order: integer('order').notNull()
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id]
    }),
    challenges: many(challenges)
}));

export const challengesEnum = pgEnum('type', ['SELECT', 'ASSIST']);

export const challenges = pgTable('challenges', {
    id: serial('id').primaryKey(),
    lessonId: integer('lesson_id').references(() => lessons.id, {
        onDelete: "cascade"
    }).notNull(),
    type: challengesEnum('type').notNull(),
    question: text( 'question').notNull(),
    order: integer('order').notNull()
});


export const challengeOptions = pgTable('challengeOptions', {
    id: serial('id').primaryKey(),
    challengeId: integer('challenge_id').references(() => challenges.id, {
        onDelete: "cascade"
    }).notNull(),
    text: text('text').notNull(),
    correct: boolean('correct').notNull(),
    imageSrc: text('image_src'),
    audioSrc: text('audio_src')
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
    lesson: one(lessons, {
        fields: [challenges.lessonId],
        references: [lessons.id]
    }),
    challengeOptions: many(challenges),
    challengeProgress: many(challengeProgress)
}));

export const challengeProgress = pgTable('challengeProgress', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    challengeId: integer('challenge_id').references(() => challenges.id, {
        onDelete: "cascade"
    }).notNull(),
    completed: boolean('completed').notNull().default(false)
});

export const challengeProgessRelations = relations(challengeProgress, ({ one, many }) => ({
    challenge: one(challenges, {
        fields: [challengeProgress.challengeId],
        references: [challenges.id]
    }),
    challengeOptions: many(challenges)
}));

export const challengesOptionsRelations = relations(challengeOptions, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeOptions.challengeId],
        references: [challenges.id]
    }),
}));

export const userProgress = pgTable("userProgress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
    activeCourseId: integer("active_course_id").references(()=> course.id, { onDelete: "cascade"}),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0)
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCourse: one(course, {
        fields: [userProgress.activeCourseId],
        references: [course.id]
    })
}));