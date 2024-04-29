import { relations } from "drizzle-orm";
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const course = pgTable("course", {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    imageSrc: text('image_src').notNull(),
});

export const courseRelations = relations(course, ({ many }) => ({
    userProgress: many(userProgress)
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