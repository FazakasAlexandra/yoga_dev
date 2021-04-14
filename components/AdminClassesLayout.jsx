import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react/cjs/react.development'

export default function AdminClassesLayout({ children, activeTab }) {
    return (
        <div className="admin-classes-layout">
            <div className="classes-header">
                <Link href="/accounts/admin/classes/week_schedule">
                    <a className={activeTab === "week_schedule" ? "button-white active" : "button-white"}>
                        WeekSchedule
                    </a>
                </Link>

                <aside>
                    <Link href="/accounts/admin/classes/list">
                        <a className={activeTab === "list" ? "button-white active" : "button-white"}>
                            Classes List
                        </a>
                    </Link>
                    <Link href="/accounts/admin/classes/attendences">
                        <a className={activeTab === "attendences" ? "button-white active" : "button-white"}>
                            <FontAwesomeIcon icon={faChartBar} size="lg" />
                        </a>
                    </Link>
                    <Link href="/accounts/admin/classes/create">
                        <a className={activeTab === "create" ? "button-white active" : "button-white"}>
                            Add class
                        </a>
                    </Link>
                </aside>
            </div>

            {children}
        </div>

    )
}
