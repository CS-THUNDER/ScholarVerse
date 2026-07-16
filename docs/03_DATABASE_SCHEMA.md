# Database Schema

## User

Stores permanent identity.

Fields

- fullName
- email
- password
- lifetimeXP
- level
- streak
- avatar
- title
- coins

----------------------------------------

## Season

Represents a leaderboard season.

Fields

- type
- seasonNumber
- startDate
- endDate
- active

----------------------------------------

## SeasonStats

Stores user performance in a season.

Fields

- user
- season
- xp
- completedTasks
- studyHours
- rank

----------------------------------------

## Planner

Stores planner configuration.

----------------------------------------

## Task

Belongs to Planner.

----------------------------------------

## Reward

Store Items

----------------------------------------

## Inventory

Unlocked Items

----------------------------------------

## Achievement

Achievement Definitions

----------------------------------------

## ActivityLog

Every important action.

----------------------------------------

## Notification

User notifications.

----------------------------------------

## Verification

Career achievements.