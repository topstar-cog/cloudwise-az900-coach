import { domains, modules, topics } from './curriculum';
import { questions } from './questions';
import type { Domain, DomainId, Module, Question, Topic } from '../types';

export function getDomain(id: DomainId): Domain | undefined {
  return domains.find((d) => d.id === id);
}

export function getModulesForDomain(domainId: DomainId): Module[] {
  return modules.filter((m) => m.domainId === domainId);
}

export function getModule(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getTopic(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}

export function getTopicsForModule(moduleId: string): Topic[] {
  return topics.filter((t) => t.moduleId === moduleId);
}

export function getQuestionsForTopic(topicId: string): Question[] {
  return questions.filter((q) => q.topicId === topicId);
}

export function getQuestionsForDomain(domainId: DomainId): Question[] {
  return questions.filter((q) => q.domainId === domainId);
}

export function getQuestion(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}

export function getAllQuestions(): Question[] {
  return questions;
}

export function getTopicForQuestion(question: Question): Topic | undefined {
  return getTopic(question.topicId);
}

export function getDomainForTopic(topicId: string): Domain | undefined {
  const topic = getTopic(topicId);
  if (!topic) return undefined;
  const mod = getModule(topic.moduleId);
  if (!mod) return undefined;
  return getDomain(mod.domainId);
}
