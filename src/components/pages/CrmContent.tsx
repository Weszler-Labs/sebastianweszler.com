"use client";

import { crmData, stageLabels, stageOrder, type CrmEntry, type CrmStage } from "@/data/crm";

function stageColor(stage: CrmStage): string {
  const colors: Record<CrmStage, string> = {
    identify: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
    research: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    prepare: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    reach_out: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    follow_up_1: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    follow_up_2: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    connect: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
    interview: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    offer: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    closed: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    archived: "bg-zinc-200 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400",
  };
  return colors[stage];
}

function priorityBadge(priority: number) {
  if (priority === 1) {
    return (
      <span className="px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 rounded-full">
        High
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 text-xs font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 rounded-full">
      Medium
    </span>
  );
}

function PipelineColumn({ stage, entries }: { stage: CrmStage; entries: CrmEntry[] }) {
  return (
    <div className="flex-shrink-0 w-72">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {stageLabels[stage]}
        </h3>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
          {entries.length}
        </span>
      </div>
      <div className="space-y-2 min-h-[200px]">
        {entries.map((entry) => (
          <div
            key={entry.company}
            className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                {entry.company}
              </h4>
              {priorityBadge(entry.priority)}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              {entry.sector.replace(/_/g, " ")} &middot; {entry.location}
            </p>
            {entry.nextAction && (
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                <span className="font-medium">Next:</span> {entry.nextAction}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CrmContent() {
  const grouped = stageOrder.reduce(
    (acc, stage) => {
      acc[stage] = crmData.filter((e) => e.status === stage);
      return acc;
    },
    {} as Record<CrmStage, CrmEntry[]>,
  );

  const totalCompanies = crmData.length;
  const activeCompanies = crmData.filter(
    (e) => !["closed", "archived"].includes(e.status),
  ).length;

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          CRM &mdash; CTO Outreach Pipeline
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {totalCompanies} target companies &middot; {activeCompanies} active
        </p>
      </div>

      <div className="flex gap-3 flex-wrap">
        {stageOrder.map((stage) => {
          const count = grouped[stage].length;
          if (count === 0) return null;
          return (
            <div
              key={stage}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${stageColor(stage)}`}
            >
              {stageLabels[stage]}: {count}
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stageOrder.map((stage) => (
          <PipelineColumn key={stage} stage={stage} entries={grouped[stage]} />
        ))}
      </div>

      <details className="mt-4">
        <summary className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100">
          Full Company Table
        </summary>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <th className="text-left py-2 pr-4 font-semibold text-zinc-700 dark:text-zinc-300">Company</th>
                <th className="text-left py-2 pr-4 font-semibold text-zinc-700 dark:text-zinc-300">Sector</th>
                <th className="text-left py-2 pr-4 font-semibold text-zinc-700 dark:text-zinc-300">Stage</th>
                <th className="text-left py-2 pr-4 font-semibold text-zinc-700 dark:text-zinc-300">Location</th>
                <th className="text-left py-2 pr-4 font-semibold text-zinc-700 dark:text-zinc-300">Status</th>
                <th className="text-left py-2 pr-4 font-semibold text-zinc-700 dark:text-zinc-300">Priority</th>
                <th className="text-left py-2 font-semibold text-zinc-700 dark:text-zinc-300">Next Action</th>
              </tr>
            </thead>
            <tbody>
              {crmData.map((entry) => (
                <tr
                  key={entry.company}
                  className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                >
                  <td className="py-2 pr-4 font-medium text-zinc-900 dark:text-zinc-100">
                    {entry.company}
                  </td>
                  <td className="py-2 pr-4 text-zinc-600 dark:text-zinc-400">
                    {entry.sector.replace(/_/g, " ")}
                  </td>
                  <td className="py-2 pr-4 text-zinc-600 dark:text-zinc-400">
                    {entry.stage.replace(/_/g, " ")}
                  </td>
                  <td className="py-2 pr-4 text-zinc-600 dark:text-zinc-400">
                    {entry.location}
                    {entry.remote && (
                      <span className="ml-1 text-blue-500" title="Remote-friendly">🌍</span>
                    )}
                  </td>
                  <td className="py-2 pr-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${stageColor(entry.status)}`}>
                      {stageLabels[entry.status]}
                    </span>
                  </td>
                  <td className="py-2 pr-4">{priorityBadge(entry.priority)}</td>
                  <td className="py-2 text-zinc-600 dark:text-zinc-400 max-w-xs truncate">
                    {entry.nextAction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
